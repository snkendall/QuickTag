const jquery = require('jquery')
const vo = require('vo')
const Nightmare = require('nightmare')
const nightmare = Nightmare({show: true})
//const neo = require('./neo4jConfig')
//const db = require('../server/db')

const hashReg = /#\w+[^#\s\W]/gm //matches all hashtags
const tagFlag = /explore\/tags/ //matches the beginning of a hashtag's href path (explore/tags)

//DON'T FORGET TO --harmony WHEN CALLING THIS WITH NODE

//49 minutes into video is code

    nightmare
    .goto('https://www.instagram.com/')
    .wait(2000)
    .click('._msxj2[href="javascript:;"]')//<a class="_msxj2" href="javascript:;">Log in</a>
    .wait(2000)
    .type('input[aria-label="Phone number, username, or email"]', 'miss_snoel')
    .type('input[aria-label="Password"', 'seamusbane')
    .click('button._qv64e._gexxb._4tgw8._njrw0')
    .wait(2000)
    .then(function() {
        let popup = document.querySelector('button._dbnr9')
        if (popup) {
            return nightmare.click('button._dbnr9')
        }
    })
    .evaluate(() => {
        //const tagSets = new Set()
        //Find each comment on the viewport
        const commentClass = 'li._ezgzd' //matches a comment div
        let comments = Array.from(document.querySelectorAll(commentClass))
        console.log(comments)
        // comments.forEach(el => {
        //     //if there is a 'more' link, click it
        //     let moreLink = el.querySelector('a._kq8rw')
        //     if (moreLink) moreLink.click()
        //     //click 'Load more comments'
        //     el.querySelector('a._m3m1c._1s3cd')
        //     //grab all the decendent's text that have hashtags in their href
        //     tagSets.add(Array.from(el.querySelectorAll('a[href^="/explore/tags"]').innerText))
        //     console.log(tagSets)
       //})
   })
    .end()
    .catch(err => console.error(err))


