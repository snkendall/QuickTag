const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('http://localhost:7474', neo4j.auth.basic('snkendall', 'dancin4jc'));
const session = driver.session();

const resultPromise = session.writeTransaction(tx => tx.run(
  'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',
  {message: 'hello, world'}));

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const greeting = singleRecord.get(0);

  console.log(greeting);

  // on application exit:
  driver.close();
});

// take an array of hashtags
const createNodes = (tagArray) => {
  const nodeArray = [];
  tagArray.forEach((tag, index, array) => { 
    session.run('MERGE (tag: hashTag {name: {tagParam}})', {tagParam: tag})
    .then(node => {
      nodeArray.push(node)
      // for (let i = index + 1; i < tagArray.length; i++){
      //   sesson.run('MERGE $node-[:USED WITH]-(tag: hashTag {name: $tagArray[i]}) ON MATCH')
      // }
    })
    .catch(err => console.error(err))
  })
  return nodeArray
}
  
const createRelationships = (nodeArray) =>
    

session.writeTransaction(tx => tx.run(
  'MERGE'
))
//MERGE each onto the database-- loop through the array
//MERGE it's relationship to each tag in the set(array)
//ON CREATE set the relationship count to 1
//ON MATCH add one to the relationship count
//Move onto the next tag in the array, never starting over at index zero

//https://www.youtube.com/watch?v=1kyPUqU-MkE
//https://www.youtube.com/watch?v=snjnJCZhXUM

//bolt://hobby-panjodampbiogbkedlckmgal.dbs.graphenedb.com:24786 graphene uri
//database user: quicktag