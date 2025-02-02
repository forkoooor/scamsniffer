const { DomainSummary, ScamList } = require("../schema");
const { reportScam } = require("../reporter");
const { increaseCount } = require('../utils/summary');

async function getAndReport() {
  try {
    const needReportDomains = await DomainSummary.findAll({
      limit: 10,
      where: {
        needReport: 1,
        reported: 0,
      },
    });
  
    let reported = 0
    for (let index = 0; index < needReportDomains.length; index++) {
      const needReportDomain = needReportDomains[index];
      const domainUrls = await ScamList.findAll({
        raw: true,
        limit: 5,
        where: {
          host: needReportDomain.host,
        },
      });
      if (domainUrls.length) {
        const reportUrl = domainUrls[0].link;
        await reportScam(reportUrl);
        needReportDomain.reported = 1
        await needReportDomain.save()
        reported++
      } else {
        await reportScam(`https://${needReportDomain.host}`);
        needReportDomain.reported = 1
        await needReportDomain.save()
        reported++
      }
    }
  
    if (reported) await increaseCount("reported", reported);
    console.log("found", needReportDomains.length);
  } catch(e) {

  }
  setTimeout(getAndReport, 10 * 1000);
}

getAndReport();
