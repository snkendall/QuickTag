const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('http://localhost:7474', neo4j.auth.basic('snkendall', 'dancin4jc'));
const session = driver.session();

const tags = ["#actor","#acting","#schmacting","#nycactor","#onCamera","#blessed","#film","#television","#entertainment","#makeyourownwork","#hustle","#industry","#womeninfilm","#werk","#work","#grateful","#glare","#script","#memory","#hardwork","#actorgym", "#lucky", "#sag","#sagaftra","#scenestudy","#dreams","#dreambig","#talent","#agent","#manager","#actingcoach","#isthisreallife","#class","#actingclass","#setlife","#actorlife"]

