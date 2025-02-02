const Sequelize = require("sequelize");
const path = require("path");
const fs = require('fs');

const mergedDatabase = path.resolve('./dataset/', "database.db");
const isFirst = !fs.existsSync(mergedDatabase);

const sequelize = new Sequelize("main", null, null, {
  dialect: "sqlite",
  storage: mergedDatabase,
  logging: false,
});

const ScamList = sequelize.define(
  "scam_list",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true,
    },
    link: Sequelize.STRING,
    topDomain: Sequelize.STRING,
    type: Sequelize.STRING,
    host: Sequelize.STRING,
    matchType: Sequelize.STRING,
    tweet: Sequelize.STRING,
    twitter: Sequelize.STRING,
    nickname: Sequelize.STRING,
    content: Sequelize.STRING,
    time: Sequelize.INTEGER,
    project: Sequelize.STRING,
    projectTwitter: Sequelize.STRING,
    projectUrl: Sequelize.STRING,
  },
  {
    indexes: [
      {
        fields: ["time", "projectTwitter", "host"],
      },
    ],
  }
);

const DomainSummary = sequelize.define(
  "domain_summary",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true,
    },
    topDomain: Sequelize.STRING,
    host: Sequelize.STRING,
    count: Sequelize.INTEGER,
    isBlack: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
    lastDetect: Sequelize.INTEGER,
    lastDetectVer: Sequelize.STRING,
    registrar: Sequelize.STRING,
    creationDate: Sequelize.DATE,
    expirationDate: Sequelize.DATE,
    lastUpdatedDate: Sequelize.DATE,
    ip: Sequelize.STRING,
    abuseMail: Sequelize.STRING,
    asn: Sequelize.STRING,
    company: Sequelize.STRING,
    raw: Sequelize.STRING,
    needReport: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
    reported: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["host"],
      },
      {
        fields: ["reported", "needReport", "host", "topDomain"],
      },
    ],
  }
);

const DetectHistory = sequelize.define(
  "detect_history",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true,
    },
    link: Sequelize.STRING,
    host: Sequelize.STRING,
    detail: Sequelize.STRING,
    linkAddress: Sequelize.STRING,
    actions: Sequelize.STRING,
  },
  {
    indexes: [
      {
        fields: ["host"],
      },
      {
        fields: ["actions", "host", "linkAddress"],
      },
    ],
  }
);


const TwitterSummary = sequelize.define(
  "twitter_summary",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true,
    },
    twitter: Sequelize.STRING,
    count: Sequelize.INTEGER,
    needReport: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
    reported: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["twitter"],
      },
    ],
  }
);

const Summary = sequelize.define(
  "summary",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true,
    },
    key: Sequelize.STRING,
    counts: Sequelize.INTEGER,
    // reported: Sequelize.INTEGER,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["key"],
      },
    ],
  }
);

const ScamActivity = sequelize.define(
  "scam_activity",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true,
    },
    link: Sequelize.STRING,
    host: Sequelize.STRING,
    address: Sequelize.STRING,
    action: Sequelize.STRING,
    detail: Sequelize.STRING,
    description: Sequelize.STRING,
    time: Sequelize.DATE,
    relatedHost: Sequelize.STRING,
  },
  {
    indexes: [
      {
        fields: ["host", "address", "action", "relatedHost"],
      },
    ],
  }
);

const Project = sequelize.define(
  "projects",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      _autoGenerated: true,
    },
    symbol: Sequelize.STRING,
    slug: Sequelize.STRING,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    logo: Sequelize.STRING,
    externalUrl: Sequelize.STRING,
    twitterUsername: Sequelize.STRING,
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["slug", "name"],
      },
    ],
  }
);

const Cache = sequelize.define(
  "cache",
  {

    key: Sequelize.STRING,
    value: Sequelize.STRING
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["key"],
      },
    ],
  }
);

async function init() {
  // await ScamList.sync({ alter: true });
  // await Cache.sync({ alter: true });
  await DomainSummary.sync({ alter: true });
  // await Summary.sync({ alter: true });
  // await TwitterSummary.sync({ alter: true });
  // await Project.sync({ alter: true });
  // await DetectHistory.sync({ alter: true });
  // const res = await sequelize.query("DROP TABLE detect_histories_backup");
  // console.log(res);
  // await ScamActivity.sync({ alter: true });
}

if (isFirst) {
  init()
}

//  init();

module.exports = {
  init,
  sequelize,
  ScamList,
  DomainSummary,
  ScamActivity,
  TwitterSummary,
  Summary,
  Cache,
  Project,
  DetectHistory,
};
