/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {Hashtag, Relationship} = require('../server/db/models')

const tags = ['#actor', '#nycactor', '#acting', '#film', '#television', '#oncamera', '#hot', '#werk', '#work', '#makeart', '#theindustry', '#cinema', '#script', '#director', '#actorgym', '#actorproblems', '#actorthings', '#actorintraining', '#nyactor', '#professional', '#memorize', '#emote', '#actallthethings', '#actors']

const randomTagArray = (num, tagInstances) => {
  console.log('randomTagArray was called')
  const tagArray = [];
  let i = 0;
  while (i < num){
    let index = Math.floor(Math.random() * (tagInstances.length - 1) + 1)
    let tempTag = tagInstances[index]
    if (tagArray.indexOf(tempTag) < 0) {
      tagArray.push(tempTag)
      i++
    }
  }
  return tagArray
}

const simulateComment = (num, array) => {
  console.log('simulateComment was called')
  let comment = randomTagArray(num, array);
  //console.log(comment[0].dataValues, comment[1].dataValues)
  comment.forEach(tag => {
     for (let i = 0; i < comment.length; i++){
      if (comment[i].id !== tag.id){
        Relationship.findOrCreate({
          where: {
            hashtagId: tag.dataValues.id,
            siblingTagId: comment[i].dataValues.id
          }
        })
         .then(result => {
           console.log(result)
        //   if (!result[1]){
        //     result[0].update({count: result[0].count + 1})
        //   }
        })
       }
     }
  })
}

const number = () => Math.floor(Math.random() * (tags.length - 1) + 1)

const comments = (array) => {
  console.log('comments was called')
  let commentArray = []
 // for (let i = 0; i < 2; i++) {
    commentArray.push(simulateComment(number(), array))
 // }
  return commentArray
}


async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

await Promise.all(tags.map(tag => Hashtag.create({ tag: tag })))
  .then((createdTags) => {
   //console.log(createdTags)
  Promise.all(comments(createdTags))
})

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  //console.log(`seeded ${hashtags.length} tags`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')