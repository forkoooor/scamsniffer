const axios = require("axios");
const { DomainSummary } = require("../schema");
const dns = require("dns");
const { Op } = require("sequelize");

require("dotenv").config();

const IPINFO_API = process.env.IPINFO_API;

const dayLimit = 20;

async function getDomainIp(domain) {
  return new Promise((resolve, reject) => {
    dns.resolve(domain, (err, result) => {
      resolve({
        err,
        result,
      });
    });
  });
}

async function getIpInfo(host) {
  const state = await getDomainIp(host);
  if (state.err) return null;
  const recentIp = state.result[0];
  try {
    const { data } = await axios.get(`${IPINFO_API}&ip=${recentIp}`);
    return data;
  } catch (err){
    console.log("error", err.toString());
  }
  return {
    input: recentIp,
    data: null,
  };
}

async function checkAndUpdate(item) {
  try {
    const { data: result } = await axios.get(
      `https://whois.scamsniffer.io/?${item.topDomain}`
    );
    const { data, error } = result;
    const ipInfo = await getIpInfo(item.host);

    if (ipInfo) {
      const { input, data } = ipInfo;
      item.ip = input;
      console.log("ip", item.host, input)
      if (data) {
        item.abuseMail = data ? data.abuse && data.abuse.email : null;
        item.asn = data ? data.asn && data.asn.asn : null;
        item.company = data ? data.company && data.company.name : null;
        item.raw = data ? JSON.stringify(data) : null;
      }
    }

    if (error) {
      console.log("error", item.topDomain, error)
      item.needReport = 6;
    }
    if (data && !error) {
      const creationDaysOfDomain = Math.floor(
        (Date.now() - new Date(data.creationDate).getTime()) / 1000 / 86400
      );

      item.creationDate = data.creationDate;
      item.expirationDate = data.expirationDate;
      item.registrar = data.registrar;
      item.lastUpdatedDate = data.updatedDate;

      if (creationDaysOfDomain < dayLimit) {
        item.needReport = 1;
      } else {
        item.needReport = 2;
      }
    }
  } catch (e) {
    console.log("error", e);
    item.needReport = 5;
  }
  await item.save();
}

async function detectRecentDomain() {
  const recentDomains = await DomainSummary.findAll({
    limit: 12,
    where: {
      needReport: {
        [Op.in]: [0, 6],
      },
    },
    order: [["id", "desc"]],
  });

  for (let index = 0; index < recentDomains.length; index++) {
    const recentDomain = recentDomains[index];
    try {
      await checkAndUpdate(recentDomain);
    } catch (e) {
      console.log("error", e);
    }
  }

  setTimeout(detectRecentDomain, 1000 * 60);
}

detectRecentDomain();