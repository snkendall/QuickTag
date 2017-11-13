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

const tags = ['#actor', '#nycactor', '#acting', '#film', '#television', '#oncamera', '#hot', '#werk', '#work', '#makeart', '#theindustry', '#cinema', '#script', '#director', '#actorgym', '#actorproblems', '#actorthings', '#actorintraining', '#nyactor', '#professional', '#memorize', '#emote', '#actallthethings', '#actors', '#schmacting', '#blessed', '#entertainment', '#makeyourownwork', '#hustle', '#womeninfilm', '#grateful', '#glare', '#memory', '#hardwork', '#lucky', '#sag', '#sagaftra', '#scenestudy', '#dreams', '#dreambig', '#talent', '#agent', '#manager', '#actingcoach', '#isthisreallife', '#class', '#actingclass', '#setlife', '#actorlife', '#filmmaker']


const createAllTheTags = (tagsArray) => {
  return Promise.all(tagsArray.map(tag => Hashtag.create({ tag: tag })))
}

const createRelationship = (tag, nextTag) => {
 return Relationship.findOrCreate({
    where: {
      hashtagId: nextTag.dataValues.id,
      siblingTagId: tag.dataValues.id
    }
  })
   .then(([instance, created]) => {
     //console.log(result)
    if (!created){
      return instance.update({count: instance.count + 1})
    }
    else {
        return instance
    }
  })
}
const simulateComment = (tagInstanceArray) => {
  console.log('simulateComment was called')
  return tagInstanceArray.reduce((accumulator, nextTag) => {
    const subArray = tagInstanceArray.reduce((subAccumulator, tag) => {
      if (tag.dataValues.id !== nextTag.dataValues.id){
        const createdRelationship = createRelationship(tag, nextTag);
        return subAccumulator.concat(createdRelationship)
      }
      else {
        return subAccumulator
      }
    }, [])
    return accumulator.concat(subArray)
  }, [])
}


async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const createdTags = await createAllTheTags(tags)
      for (let i = 0; i < 100; i++){
        await Promise.all(simulateComment(createdTags.filter(tag => Math.round(Math.random()))))
      }
  console.log(`seeded successfully`)
}

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

console.log('seeding...')
