const link_receiver_query = `WITH
  all_hackers AS (
    select
      b."to" as receiver
    from
      erc721."ERC721_evt_Transfer" b
      left join ethereum.transactions as a on a.hash = b.evt_tx_hash
    where
      a."from" = CONCAT(
        '\\x',
        substring(
          '{{contract}}'
          from
            3
        )
      ):: bytea -- Allow user to input 0x... format and convert to \\x... format
    group by
      b."to"
    union
    select
      b."to" as receiver
    from
      erc721."ERC721_evt_Transfer" b
      left join ethereum.transactions as a on a.hash = b.evt_tx_hash
    where
      a."to" = CONCAT(
        '\\x',
        substring(
          '{{contract}}'
          from
            3
        )
      ):: bytea -- Allow user to input 0x... format and convert to \\x... format
    group by
      b."to"
  )
 
select * from all_hackers
`;


const recent_lost_query = `select
"from",
"to",
b.name,
 date_trunc('day', evt_block_time) AS DAY,
labels.get("from", 'ens name reverse') as ens_name,
count(distinct("tokenId")) as counts 
from  erc721."ERC721_evt_Transfer" a
left join nft."tokens" as b on b.contract_address = a.contract_address
WHERE "to" in (
ADDRESS_LIST
) 
and b.name in ( 'CryptoPunks',
    'Bored Ape Yacht Club',
    'Mutant Ape Yacht Club',
    'Otherdeed for Otherside',
    'Art Blocks Curated',
    'Azuki',
    'CLONE X - X TAKASHI MURAKAMI',
    'Decentraland',
    'The Sandbox',
    'Moonbirds',
    'Doodles',
    'Meebits',
    'Cool Cats NFT',
    'Rarible',
    'Bored Ape Kennel Club',
    'Loot (for Adventurers)',
    'CryptoKitties',
    'CrypToadz by GREMPLIN',
    'World of Women',
    'SuperRare',
    'Parallel Alpha',
    'Art Blocks Playground',
    'BEANZ Official',
    'Bored Ape Chemistry Club',
    'Pudgy Penguins',
    'HAPE PRIME',
    'VeeFriends',
    'RTFKT - MNLTH',
    'Art Blocks Factory',
    'Decentraland Wearables',
    'Sorare',
    'NFT Worlds',
    '0N1 Force',
    'MekaVerse',
    'Murakami.Flowers Seed',
    'ZED RUN Legacy',
    'Fidenza by Tyler Hobbs',
    'PXN: Ghost Division',
    'adidas Originals Into the Metaverse',
    'Karafuru',
    'Hashmasks',
    'Invisible Friends',
    'mfers',
    'My Curio Cards',
    'RTFKT - CloneX Mintvial',
    'Okay Bears',
    'Creature World',
    'FLUF World',
    'PhantaBear',
    '3Landers',
    'Emblem Vault [Ethereum]',
    'CyberKongz VX',
    'CyberBrokers',
    'ENS: Ethereum Name Service',
    'CyberKongz (Babies)',
    'LOSTPOETS',
    'Prime Ape Planet PAP',
    'Cool Pets NFT',
    'The Doge Pound',
    'Lazy Lions',
    'Pixel Vault MintPass',
    'Kaiju Kingz',
    'DeadFellaz',
    'Creepz Genesis',
    'World of Women Galaxy',
    'Town Star',
    'Axie Infinity',
    'alien frens',
    'MyCryptoHeroes',
    'Ringers by Dmitri Cherniak',
    'Somnium Space VR',
    'goblintown.wtf',
    'CyberKongz',
    'VeeFriends Series 2',
    'Voxels (formerly Cryptovoxels)',
    'Metroverse Genesis',
    'VOX Collectibles',
    'Capsule House',
    'Worldwide Webb Land',
    'PUNKS Comic',
    'Psychedelics Anonymous Genesis',
    'SupDucks',
    'Gutter Cat Gang',
    'Lives of Asuna',
    'Sneaky Vampire Syndicate',
    'Wolf Game',
    'Killer GF',
    'Adam Bomb Squad',
    'CryptoSkulls',
    'Treeverse',
    '888 inner circle',
    'MURI by Haus',
    'NeoTokyo Outer Identities',
    'Autoglyphs',
    'Impostors Genesis Aliens',
    'Ragnarok Meta',
    'Damien Hirst - The Currency',
    'JUNGLE FREAKS GENESIS',
    'MoonCats',
    'GalacticApes',
    'Arcade Land',
    'Rumble Kong League',
    'oncyber labs',
    'Meridian by Matt DesLauriers',
    'CryptoPunks V1 (wrapped)',
    'CryptoBatz by Ozzy Osbourne',
    'tubby cats',
    'VOX Collectibles: Mirandus',
    'Project NANOPASS',
    'MutantCats',
    'MakersPlace',
    'PROOF Collective',
    'MetaHero Universe: Generative Identities',
    'Robotos',
    'Chromie Squiggle by Snowfro',
    'KIWAMI Genesis',
    'JRNY Club',
    'Anonymice',
    'Boss Beauties',
    'HYPEBEARSCLUB.OFFICIAL',
    'FULL SEND METACARD NFT',
    'Pixelmon - Generation 1',
    'Bears Deluxe Old',
    'Galaxy-Eggs',
    'My Pet Hooligan',
    'Treeverse Plots',
    'RaidParty Heroes',
    'DEGEN TOONZ COLLECTION',
    'Neo Tokyo Identities',
    'Mirandus',
    'RaidParty Fighters',
    'Forgotten Runes Wizards Cult',
    'CryptoMories',
    'C-01 Official Collection',
    'Wolf Game Legacy',
    'Quirkies Originals',
    'hausphases by Haus',
    'Crypto Bull Society',
    'Fragments of an Infinite Field by Monica Rizzolli',
    'Koala Intelligence Agency',
    'Frontier Game',
    'ZombieClub Token',
    'Chain Runners',
    'OxyaOriginProject',
    'Crypto.Chicks',
    'Murakami.Flowers Official',
    'THE SHIBOSHIS',
    'The Heart Project',
    'The Humanoids',
    'The Sevens - Genesis',
    'Creepz Shapeshifterz',
    'Decentral Games ICE Poker',
    '"MOAR" by Joan Cornella',
    'DeGods',
    'inBetweeners by GianPiero',
    'PEACEFUL GROUPIES',
    'PREMINT Collector Pass - OFFICIAL',
    'Akutars',
    'MetaHero Universe: United Planets',
    'IO: Imaginary Ones',
    'FVCK_CRYSTAL//',
    'Desperate ApeWives',
    'OnChainMonkey',
    'Wizards & Dragons Game (WnD)',
    'The CryptoDads',
    'Tasty Bones XYZ',
    'Ape Kids Club (AKC)',
    'Archetype by Kjetil Golid',
    'Animetas',
    'the littles NFT',
    'Rug Radio - Genesis NFT',
    'DourDarcels',
    'Tom Sachs: Rocket Factory - Components',
    'The n project',
    'Smilesss',
    'Crypto Unicorns Market',
    'WonderPals',
    'Blitmap',
    'GEN.ART Membership',
    'Creepz Reptile Armoury',
    'ASM AIFA Genesis',
    'The Meta Key',
    'ALPACADABRAZ',
    'TIMEPieces Build a Better Future: Genesis Drop',
    'MoodRollers by Lucas Zanotto',
    'Akuma Origins',
    'Geometry Runners by Rich Lord',
    'SlimHoods',
    'SUPERPLASTIC: Cryptojankyz',
    'Neo Tokyo Part 2 Vault Cards',
    'Trippin’ Ape Tribe',
    'Edenhorde',
    '10KTF',
    'Cool Monkes Genesis',
    'Sappy Seals',
    'Chimpers',
    'The Sandbox ASSETS',
    'The Wicked Craniums',
    'Wassies by Wassies',
    'Wrapped Cryptopunks',
    'NFT Bored Bunny',
    'Antonym: GENESIS',
    'Bloot (not for Weaks)',
    'GNSS by MGXS',
    'Winter Bears',
    'Shinsekaicorp',
    'GEVOLs',
    'Gutter Juice',
    'CatBlox Genesis Collection',
    'The Art of Seasons',
    'phase by Loren Bednar',
    'EightBit Me',
    'Crypto Coven',
    'Starcatchers',
    'FishyFam',
    'Everai Heroes: Duo',
    'Dippies',
    'Flyfish Club',
    'RTFKT X NIKE MONOLITH',
    'X Rabbits Club',
    '(B)APETAVERSE',
    'Milady Maker',
    'The Vogu Collective',
    'THE META KONGZ KLAYTN',
    'Metasaurs by Dr. DMT',
    'Pigments by Darien Brito',
    'KnownOrigin',
    'Skulptuur by Piter Pasma',
    'Boki',
    'Acrocalypse',
    'Galaxy Fight Club',
    'Apocalyptic Apes',
    'Stoner Cats',
    'Wicked Ape Bone Club',
    'BASTARD GAN PUNKS V2',
    'ASM Brains',
    'Nifty League DEGENs',
    'Cupcats Official',
    'PartyBear',
    'T-O-S The Other Side',
    'TBAC',
    'Wrapped MoonCatsRescue - Unofficial',
    'Swampverse',
    'Deafbeef',
    'VaynerSports Pass VSP',
    'Party Ape Billionaire Club',
    'MekaApes Game by OogaVerse',
    'More Than Gamers | MTG',
    'Habbo Avatars',
    'Akutar Mint Pass',
    'Genesis Critterz',
    'FoxFam',
    'NeoTokyo Citizens',
    'XCOPY',
    'FOMO MOFOS',
    'The Doggies (Snoop Dogg)',
    'FLUF World: Burrows',
    'Little Lemon Friends',
    'Voxies',
    'Monster Ape Club | MAC',
    'Ape Gang Unmigrated',
    'Shiba Social Club Official Collection',
    'Ecumenopolis by Joshua Bagley',
    'CryptoDickbutts',
    'Ghxsts',
    'Loser Club Official',
    'Gray Boys',
    'Boonji Project',
    'Subscapes by Matt DesLauriers',
    'Los Muertos World',
    'Llamaverse Genesis',
    'dotdotdots',
    'HOWLERZ',
    'Gutter Rats',
    'BYOPill',
    'Wolf Game - Wool Pouch',
    'Sipherian Surge',
    'SuperFarm Genesis Series',
    'Cets on Creck',
    '10KTF Stockroom',
    'GENE_SIS: The Girls of Armament',
    'DystoPunks',
    'Fang Gang',
    'HeadDAO',
    'BEEPLE: EVERYDAYS - THE 2020 COLLECTION',
    'SUPERPLASTIC: SUPERGUCCI',
    'Cryptoon Goonz',
    'Al Cabones',
    'KCG',
    'WVRPS by WarpSound (Official)',
    'SpacePunksClub',
    'CryptoArte',
    'WomenRise',
    '1111 by Kevin Abosch',
    'RTFKT x Nike Dunk Genesis CRYPTOKICKS',
    'Gooniez Gang Official')
and a."evt_block_time" > now() - interval '7 days'
group by "from", "to", b.name, DAY
order by counts desc
`;



const recent_tokens = `
select
  contract_address,
  "tokenId",
  min(evt_block_time) as first_time
from
  erc721."ERC721_evt_Transfer"
WHERE
  "to" in (
   ADDRESS_LIST
  )
  and contract_address in (
'\\xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb','\\xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d','\\x60e4d786628fea6478f785a6d7e704777c86a7c6','\\x34d85c9cdeb23fa97cb08333b511ac86e1c4e258','\\xed5af388653567af2f388e6224dc7c4b3241c544','\\xf87e31492faf9a91b02ee0deaad50d51d56d5d4d','\\x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b','\\x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38','\\x23581767a106ae21c074b2276d25e5c3e136a68b','\\x8a90cab2b38dba80c64b7734e58ee1db38b8992e','\\x7bd29408f11d2bfc23c34f18275bbf23bb716bc7','\\x1a92f7381b9f03921564a437210bb9396471050c','\\x6a5ff3ceecae9ceb96e6ac6c76b82af8b39f0eb3','\\xba30e5f9bb24caa003e9f2f0497ad287fdf95623','\\xff9c1b15b16263c61d017ee9f65c50e4ae0113d7','\\x06012c8cf97bead5deae237070f9587f8e7a266d','\\xe785e82358879f061bc3dcac6f0444462d4b5330','\\xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2','\\x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6','\\x76be3b62873462d2142405439777e971754e8e77','\\x41a322b28d0ff354040e2cbc676f0320d8c8850d','\\x306b1ea3ecdf94ab739f1910bbda052ed4a9f949','\\x22c36bfdcef207f9c0cc941936eff94d4246d14a','\\xbd3531da5cf5857e7cfaa92426877b022e612cf8','\\x4db1f25d3d98600140dfc18deb7515be5bd293af','\\xa3aee8bce55beea1951ef834b99f3ac60d1abeeb','\\x86825dfca7a6224cfbd2da48e85df2fc3aa7c4b1','\\x629a673a8242c2ac4b7b8c5d8735fbeac21a6205','\\xbd4455da5929d5639ee098abfaa3241e9ae111af','\\x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d','\\x9a534628b4062e123ce7ee2222ec20b86e16ca8f','\\x341a1c534248966c4b6afad165b98daed4b964ef','\\x28472a58a490c5e09a238847f66a68a47cc76f0f','\\x160c404b2b49cbc3240055ceaee026df1e8497a0','\\xd2f668a8461d6761115daf8aeb3cdf5f40c532c6','\\xc2c747e0f7004f9e8817db2ca4997657a7746928','\\x59468516a8259058bad1ca5f8f4bff190d30e066','\\x79fcdef22feed20eddacbb2587640e45491b757f','\\xbce3781ae7ca1a5e050bd9c4c77369867ebc307e','\\x73da73ef3a6982109c4d5bdb0db9dd3e3783f313','\\x348fc118bcc65a92dc033a951af153d14d945312','\\xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d','\\xc92ceddfb8dd984a89fb494c376f9a48b999aafc','\\x67d9417c9c3c250f61a83c7e8658dac487b56b09','\\xb4d06d46a8285f4ec79fd294f78a881799d8ced9','\\x82c7a8f707110f5fbb16184a5933e9f78a34c6ab','\\x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85','\\x7ea3cca10668b8346aec0bf1844a49e995527c8b','\\x892848074ddea461a15f337250da3ce55580ca85','\\xc36cf0cfcb5d905b8b513860db0cfe63f6cf9f5c','\\xa7206d878c5c3871826dfdb42191c49b1d11f466','\\x6632a9d63e142f17a668064d41a21193b49b41a0','\\x86c10d10eca1fca9daf87a279abccabe0063f247','\\x8943c7bac1914c9a7aba750bf2b6b09fd21037e0','\\xf4ee95274741437636e748ddac70818b4ed7d043','\\x33cfae13a9486c29cd3b11391cc7eca53822e8c7','\\x0c2e57efddba8c768147d1fdf9176a0a6ebd5d83','\\x2acab3dea77832c09420663b0e1cb386031ba17b','\\xfe8c6d19365453d26af321d0e8c910428c23873f','\\xf61f24c2d93bf2de187546b14425bf631f28d6dc','\\x123b30e25973fecd8354dd5f41cc45a3065ef88c','\\xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d','\\x273f7f8e6489682df756151f5525576e322d51a3','\\x913ae503153d9a335398d0785ba60a2d63ddb4e2','\\xd532b88607b1877fe20c181cba2550e3bbd6b31c','\\x9378368ba6b85c1fba5b131b530f5f5bedf21a18','\\x57a204aa1042f6e66dd7730813f4024114d74f37','\\xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c','\\x79986af15539de2db9a5086382daeda917a9cf0c','\\x0e9d6552b85be180d941f1ca73ae3e318d2d4f1f','\\xa5c0bd78d1667c13bfb403e2a3336871396713c5','\\xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51','\\xfcb1315c4273954f74cb16d5b663dbf479eec62e','\\xa9c0a07a7cb84ad1f2ffab06de3e55aab7d523e8','\\x75e95ba5997eb235f40ecf8347cdb11f18ff640b','\\x3fe1a4c1481c8351e91b64d5c398b159de07cbc5','\\xedb61f74b0d09b2558f1eeb79b247c1f363ae452','\\xaf615b61448691fc3e4c61ae4f015d6e77b6cca8','\\x219b8ab790decc32444a6600971c7c3718252539','\\x7f36182dee28c45de6072a34d29855bae76dbe2f','\\x6be69b2a9b153737887cfcdca7781ed1511c7e36','\\x7ab2352b1d2e185560494d5e577f9d3c238b78c5','\\xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9','\\x36d30b3b85255473d27dd0f7fd8f35e36a9d6f06','\\x4b61413d4392c806e6d0ff5ee91e6073c21d6430','\\x698fbaaca64944376e2cdc4cad86eaa91362cf54','\\xaadc2d4261199ce24a4b0a57370c4fcf43bb60aa','\\xd4e4078ca3495de5b1d4db434bebc5a986197782','\\x3110ef5f612208724ca51f5761a69081809f03b7','\\x497a9a79e82e6fc0ff10a16f6f75e6fcd5ae65a8','\\x7e6bc952d4b4bd814853301bee48e99891424de0','\\xc3f733ca98e0dad0386979eb96fb1722a1a05e69','\\x12d2d1bed91c24f878f37e66bd829ce7197e4d14','\\x4a8c9d751eeabc5521a68fb080dd7e72e46462af','\\x226bf5293692610692e2c996c9875c914d2a7f73','\\xd78b76fcc33cd416da9d3d42f72649a23d7ac647','\\xef0182dc0574cd5874494a120750fd222fdb909a','\\x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d','\\xca7ca7bcc765f77339be2d648ba53ce9c8a262bd','\\xc8adfb4d437357d0a656d4e62fd9a6d22e401aa0','\\xf76179bb0924ba7da8e7b7fc2779495d7a7939d8','\\xf54cc94f1f2f5de012b6aa51f1e7ebdc43ef5afc','\\x08d7c0242953446436f34b4c78fe9da38c73668d','\\xaadba140ae5e4c8a9ef0cc86ea3124b446e3e46a','\\x11bdfb09bebf4f0ab66dd1d6b85d0ef58ef1ba6c','\\x6dc6001535e15b9def7b0f6a20a2111dfa9454e2','\\x7d8820fa92eb1584636f4f5b8515b5476b75171a','\\x099689220846644f87d1137665cded7bf3422747','\\x701a038af4bd0fc9b69a829ddcb2f61185a49568','\\x0b4b2ba334f476c8f41bfe52a428d6891755554d','\\xb5c747561a185a146f83cfff25bdfd2455b31ff4','\\x19b86299c21505cdf59ce63740b240a9c822b5e4','\\xbad6186e92002e312078b5a1dafd5ddf63d3f731','\\x7ecb204fed7e386386cab46a1fcb823ec5067ad5','\\x14e0a1f310e2b7e321c91f58847e98b8c802f6ef','\\x32973908faee0bf825a343000fe412ebe56f802a','\\x09233d553058c2f42ba751c87816a8e9fae7ef10','\\x1b829b926a14634d36625e60165c0770c09d02b2','\\xa08126f5e1ed91a635987071e6ff5eb2aeb67c48','\\x966731dfd9b9925dd105ff465687f5aa8f54ee9f','\\x86357a19e5537a8fba9a004e555713bc943a66c0','\\x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42','\\x87e738a3d5e5345d6212d8982205a564289e6324','\\x1a2f71468f656e97c2f86541e57189f59951efe7','\\x3903d4ffaaa700b62578a66e7a67ba4cb67787f9','\\x6fd053bff10512d743fa36c859e49351a4920df6','\\xeb834ae72b30866af20a6ce5440fa598bfad3a42','\\x5be99338289909d6dbbc57bb791140ef85ccbcab','\\x469823c7b84264d1bafbcd6010e9cdf1cac305a3','\\x236672ed575e1e479b8e101aeeb920f32361f6f9','\\x3f5fb35468e9834a43dca1c160c69eaae78b6360','\\x9c80777cae192e5031c38a0d951c55730ecc3f5e','\\x97597002980134bea46250aa0510c9b90d87a587','\\xe106c63e655df0e300b78336af587f300cff9e76','\\x1981cc36b59cffdd24b01cc5d698daa75e367e04','\\x11450058d796b02eb53e65374be59cff65d3fe7f','\\xce50f3ca1f1dbd6fa042666bc0e369565dda457d','\\x3a5051566b2241285be871f650c445a88a970edd','\\xe0176ba60efddb29cac5b15338c9962daee9de0c','\\xeb3a9a839dfeeaf71db1b4ed6a8ae0ccb171b227','\\xf497253c2bb7644ebb99e4d9ecc104ae7a79187a','\\xaad35c2dadbe77f97301617d82e661776c891fa9','\\xf1083e064f92db0561fd540f982cbf73a4e2f8f6','\\x94638cbf3c54c1f956a5f05cbc0f9afb6822020d','\\x4f89cd0cae1e54d98db6a80150a824a533502eea','\\x7deb7bce4d360ebe68278dee6054b882aa62d19c','\\x716f29b8972d551294d9e02b3eb0fc1107fbf4aa','\\x7afeda4c714e1c0a2a1248332c100924506ac8e6','\\x960b7a6bcd451c9968473f7bbfd9be826efd549a','\\xf1268733c6fb05ef6be9cf23d24436dcd6e0b35e','\\xecdd2f733bd20e56865750ebce33f17da0bee461','\\x999e88075692bcee3dbc07e7e64cd32f39a1d3ab','\\x659a4bdaaacc62d2bd9cb18225d9c89b5b697a5a','\\x1b79c7832ed9358e024f9e46e9c8b6f56633691b','\\x9bf252f97891b907f002f2887eff9246e3054080','\\x18df6c571f6fe9283b87f910e41dc5c8b77b7da5','\\x8ff1523091c9517bc328223d50b52ef450200339','\\xc6ec80029cd2aa4b0021ceb11248c07b25d2de34','\\x8d609bd201beaea7dccbfbd9c22851e23da68691','\\x177ef8787ceb5d4596b6f011df08c86eb84380dc','\\x11595ffb2d3612d810612e34bc1c2e6d6de55d26','\\x05a46f1e545526fb803ff974c790acea34d1f2d6','\\x3acce66cd37518a6d77d9ea3039e00b3a2955460','\\x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63','\\x1ca39c7f0f65b4da24b094a9afac7acf626b7f38','\\x5f4a54e29ccb8a02cdf7d7bfa8a0999a8330cced','\\x26437d312fb36bdd7ac9f322a6d4ccfe0c4fa313','\\x10daa9f4c0f985430fde4959adb2c791ef2ccf83','\\x80336ad7a747236ef41f47ed2c7641828a480baa','\\x0cfb5d82be2b949e8fa73a656df91821e2ad99fd','\\x3db5463a9e2d04334192c6f2dd4b72def4751a61','\\xdd69da9a83cedc730bc4d3c56e96d29acc05ecde','\\xe3234e57ac38890a9136247eadfe1860316ff6ab','\\x248139afb8d3a2e16154fbe4fb528a3a214fd8e7','\\xfa7e3f898c80e31a3aedeae8b0c713a3f9666264','\\x2931b181ae9dc8f8109ec41c42480933f411ef94','\\x066f2d5ead7951f0d0038c19affd500b9f02c0e5','\\x9eeaecbe2884aa7e82f450e3fc174f30fc2a8de3','\\xab0b0dd7e4eab0f9e31a539074a03f1c1be80879','\\x716039ab9ce2780e35450b86dc6420f22460c380','\\x364c828ee171616a39897688a831c2499ad972ec','\\x5bd815fd6c096bab38b4c6553cfce3585194dff9','\\xa342f5d851e866e18ff98f351f2c6637f4478db5','\\x85f740958906b317de6ed79663012859067e745b','\\xb7f7f6c52f2e2fdb1963eab30438024864c313f6','\\x1d20a51f088492a0f1c57f047a9e30c9ab5c07ea','\\x9372b371196751dd2f603729ae8d8014bbeb07f6','\\x7e3ef31186d1bec0d3f35ad701d065743b84c790','\\x6d4bbc0387dd4759eee30f6a482ac6dc2df3facf','\\x4f8730e0b32b04beaa5757e5aea3aef970e5b613','\\xa6a5ec7b1b8a34ff2dcb2926b7c78f52a5ce3b90','\\xc8bcbe0e8ae36d8f9238cd320ef6de88784b1734','\\x98b82d9efc577b1c3aa6578342121231db2b47b9','\\x34b4df75a17f8b3a6eff6bba477d39d701f5e92c','\\x86c35fa9665002c08801805280ff6a077b23c98a','\\x092bbc993042a69811d23feb0e64e3bfa0920c6a','\\x82f5ef9ddc3d231962ba57a9c2ebb307dc8d26c2','\\x6080b6d2c02e9a0853495b87ce6a65e353b74744','\\x5180db8f5c931aae63c74266b211f580155ecac8','\\x69b9c98e8d715c25b330d0d4eb07e68cbb7f6cfc','\\x9a38dec0590abc8c883d72e52391090e948ddf12','\\xc9d8f15803c645e98b17710a0b6593f097064bef','\\x63fa29fec10c997851ccd2466dad20e51b17c8af','\\x5af0d9827e0c53e4799bb226655a1de152a425a5','\\x534d37c630b7e4d2a6c1e064f3a2632739e9ee04','\\x4addca4c07a5e9a6b4973094d03ad5aae7735e5b','\\x18c7766a10df15df8c971f6e8c1d2bba7c7a410b','\\xdde2d979e8d39bb8416eafcfc1758f3cab2c9c72','\\xf7143ba42d40eaeb49b88dac0067e54af042e963','\\xd73acd7f5099fdd910215dbff029185f21ffbcf0','\\x07c3249625d2f1e825325aa739c5d8e69b96f3ac','\\xf793a77e32a0e5c0cd28383e1e04bbc66ee52438','\\xd0318da435dbce0b347cc6faa330b5a9889e3585','\\xd4d871419714b778ebec2e22c7c53572b573706e','\\x31385d3520bced94f77aae104b406994d8f2168c','\\xbe6e3669464e7db1e1528212f0bff5039461cb82','\\x35471f47c3c0bc5fc75025b97a19ecdde00f78f8','\\x986aea67c7d6a15036e18678065eb663fc5be883','\\x8cd8155e1af6ad31dd9eec2ced37e04145acfcb3','\\x7cc7add921e2222738561d03c89589929cefcf21','\\xcb4307f1c3b5556256748ddf5b86e81258990b3c','\\xbce6d2aa86934af4317ab8615f89e3f9430914cb','\\x7c40c393dc0f283f318791d746d894ddd3693572','\\x95784f7b5c8849b0104eaf5d13d6341d8cc40750','\\xd754937672300ae6708a51229112de4017810934','\\x5df340b5d1618c543ac81837da1c2d2b17b3b5d8','\\xb668beb1fa440f6cf2da0399f8c28cab993bdd65','\\x8a1bbef259b00ced668a8c69e50d92619c672176','\\xc71a726d390bf02b4af8920c0820970310d0f367','\\x49907029e80de1cbb3a46fd44247bf8ba8b5f12f','\\xc7df86762ba83f2a6197e1ff9bb40ae0f696b9e6','\\x94b6f3978b0a32f7fa0b15243e86af1aec23deb5','\\x8ffb9b504d497e4000967391e70d542b8cc6748a','\\xd652d2633cdbfd5f27f50cddb098e708fa8433f3','\\x7cba74d0b16c8e18a9e48d3b7404d7739bb24f23','\\xe51aac67b09eaed6d3d43e794d6bae679cbe09d8','\\x818a19a6d3f0859b68e8490a6e945a51060caad1','\\xe3435edbf54b5126e817363900234adfee5b3cee','\\x42069abfe407c60cf4ae4112bedead391dba1cdb','\\x0b22fe0a2995c5389ac093400e52471dca8bb48a','\\x32ddbb0fc65bb53e1f7d6dc1c2a713e9a695b75b','\\xd692ced124a474f051f9744a301c26d1017b3d54','\\xc878671ff88f1374d2186127573e4a63931370fc','\\x7daec605e9e2a1717326eedfd660601e2753a057','\\x6728d91abacdbac2f326baa384513a523c21b80a','\\x709d30f1f60f03d85a0ef33142ef3259392dc9e1','\\x9df8aa7c681f33e442a0d57b838555da863504f3','\\x8d4100897447d173289560bc85c5c432be4f44e4','\\xcbd38d10511f0274e040085c0bc1f85cc96fff82','\\x4cd0ea8b1bdb5ab9249d96ccf3d8a0d3ada2bc76','\\xce25e60a89f200b1fa40f6c313047ffe386992c3','\\x40cf6a63c35b6886421988871f6b74cc86309940','\\xd7b397edad16ca8111ca4a3b832d0a5e3ae2438c','\\xb76fbbb30e31f2c3bdaa2466cfb1cfe39b220d06','\\xbd275ce24f32d6ce4e9d9519c55abe9bc0ed7fcf','\\xd8a5d498ab43ed060cb6629b97a19e3e4276dd9f','\\x9c57d0278199c931cf149cc769f37bb7847091e7','\\xe4597f9182ba947f7f3bf8cbc6562285751d5aee','\\x1fec856e25f757fed06eb90548b0224e91095738','\\x78d61c684a992b0289bbfe58aaa2659f667907f8','\\x63c0691d05f441f42915ca6ca0a6f60d8ce148cd','\\xf661d58cfe893993b11d53d11148c4650590c692','\\xbea8123277142de42571f1fac045225a1d347977','\\x9d418c2cae665d877f909a725402ebd3a0742844','\\xf62c6a8e7bcdc96cda11bd765b40afa9ffc19ab9','\\x0322f6f11a94cfb1b5b6e95e059d8deb2bf17d6a','\\x392179031da3012dac321703a29e4c9fbd26316b','\\xa302f0d51a365b18e86c291056dc265a73f19419','\\xcbc67ea382f8a006d46eeeb7255876beb7d7f14d','\\x26badf693f2b103b021c670c852262b379bbbe8a','\\x45db714f24f5a313569c41683047f1d49e78ba07','\\xbace7e22f06554339911a03b8e0ae28203da9598','\\x7f7685b4cc34bd19e2b712d8a89f34d219e76c35','\\x7f72528229f85c99d8843c0317ef91f4a2793edf','\\x05e7f2499ff153fea2f20bbde0b5584c911c0af1','\\x880644ddf208e471c6f2230d31f9027578fa6fcc','\\x64b6b4142d4d78e49d53430c1d3939f2317f9085','\\x18cd9fda7d584401d04e30bf73fb0013efe65bb0','\\x22c08c358f62f35b742d023bf2faf67e30e5376e','\\x6e9da81ce622fb65abf6a8d8040e460ff2543add','\\x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d','\\x3abedba3052845ce3f57818032bfa747cded3fca','\\x2c88aa0956bc9813505d73575f653f69ada60923','\\xb852c6b5892256c264cc2c888ea462189154d8d7','\\xd7bea2b69c7a1015aadaa134e564eee6d34149c0','\\x0616a2ef54bad0b37dce41c8d8e35cce17a926f3','\\xdbcab7a768ea9a00b2ffa5a2eb387cad609e2114','\\x582048c4077a34e7c3799962f1f8c5342a3f4b12','\\x1792a96e5668ad7c167ab804a100ce42395ce54d','\\xa74ae2c6fca0cedbaef30a8ceef834b247186bcf','\\x3f4a885ed8d9cdf10f3349357e3b243f3695b24a','\\x9a06ef3a841316a9e2c1c93b9c21a7342abe484f','\\x343f999eaacdfa1f201fb8e43ebb35c99d9ae0c1','\\x696115768bbef67be8bd408d760332a7efbee92d','\\x5c1a0cc6dadf4d0fb31425461df35ba80fcbc110','\\x9f9c171afde4cc6bbf6d38ae4012c83633653b85','\\x40fb1c0f6f73b9fc5a81574ff39d27e0ba06b17b','\\x16de9d750f4ac24226154c40980ef83d4d3fd4ad','\\xd0a07a76746707f6d6d36d9d5897b14a8e9ed493','\\x6fc355d4e0ee44b292e50878f49798ff755a5bbc','\\x3c28de567d1412b06f43b15e9f75129625fa6e8c','\\x98a0227e99e7af0f1f0d51746211a245c3b859c2','\\x181aea6936b407514ebfc0754a37704eb8d98f91','\\x9c8ff314c9bc7f6e59a9d9225fb22946427edc03','\\xc631164b6cb1340b5123c9162f8558c866de1926','\\x454cbc099079dc38b145e37e982e524af3279c44','\\xe4f5e0d5c033f517a943602df942e794a06bc123','\\x9ca8887d13bc4591ae36972702fdf9de2c97957f','\\xafb44cef938b1be600a4331bf9904f6cec2fcac3','\\x4be3223f8708ca6b30d1e8b8926cf281ec83e770','\\x5845e5f0571427d0ce33550587961262ca8cdf5c','\\xb7be4001bff2c5f4a61dd2435e4c9a19d8d12343','\\x369156da04b6f313b532f7ae08e661e402b1c2f2','\\xa7ee407497b2aeb43580cabe2b04026b5419d1dc','\\x9261b6239a85348e066867c366d3942648e24511','\\xdfacd840f462c27b0127fc76b63e7925bed0f9d5','\\xfb61bd914d4cd5509ecbd4b16a0f96349e52db3d','\\xc1ad47aeb274157e24a5f01b5857830aef962843','\\xeda3b617646b5fc8c9c696e0356390128ce900f8','\\x338866f8ba75bb9d7a00502e11b099a2636c2c18','\\x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1','\\x3a8778a58993ba4b941f85684d74750043a4bb5f','\\xe4605d46fd0b3f8329d936a8b258d69276cba264','\\x25cd67e2dfec471acd3cdd3b22ccf7147596dd8b','\\x77640cf3f89a4f1b5ca3a1e5c87f3f5b12ebf87e','\\x35e1402fa69c60851ea8b86f04d823ff41796a51','\\x2250d7c238392f4b575bb26c672afe45f0adcb75','\\x03ef30e1aee25abd320ad961b8cd31aa1a011c97','\\xc1922a5abfa18110827c0666b7bbac0389ab7396','\\xc5e55e4bd5fef12831b5a666fc9e391538acdc45','\\x198478f870d97d62d640368d111b979d7ca3c38f','\\x18a62e93ff3ab180e0c7abd4812595bf2be3405f','\\xaa20f900e24ca7ed897c44d92012158f436ef791','\\x72d47d4d24018ec9048a9b0ae226f1c525b7e794','\\x2d0ee46b804f415be4dc8aa1040834f5125ebd2e','\\x4e1f41613c9084fdb9e34e11fae9412427480e56','\\x4a537f61ef574153664c0dbc8c8f4b900cacbe5d','\\x244fc4178fa685af909c88b4d4cd7eb9127edb0b','\\x0938e3f7ac6d7f674fed551c93f363109bda3af9','\\x8184a482a5038b124d933b779e0ea6e0fb72f54e','\\x1554f51f18f8e3fbe83e4442420e40efc57ff446','\\x1afef6b252cc35ec061efe6a9676c90915a73f18','\\x0f78c6eee3c89ff37fd9ef96bd685830993636f2','\\x9f9b2b8e268d06dc67f0f76627654b80e219e1d6','\\xf75140376d246d8b1e5b8a48e3f00772468b3c0c','\\xd77e17ecc3942b6e83f67c56999c5230c70a85a4','\\x0811f26c17284b6e331beaa2328471107576e601','\\xc22616e971a670e72f35570337e562c3e515fbfe','\\x87084ec881d5a15c918057f326790db177d218f2','\\xddb149ae8e6635df01a530da1e46921bd78dc385','\\x2efa07cac3395599db83035d196f2a0e7263f766','\\x6c424c25e9f1fff9642cb5b7750b0db7312c29ad','\\x80a4b80c653112b789517eb28ac111519b608b19','\\xcb2411c2b914b000ad13c86027222a797983ef2d','\\x3ca5b00ade54365fbd590d4bc397e044a13068e5','\\x1eff5ed809c994ee2f500f076cef22ef3fd9c25d')
group by
  1,
  2`;

module.exports = {
  link_receiver_query,
  recent_lost_query,
  recent_tokens,
};