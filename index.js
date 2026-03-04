import { tweetsData } from "./data.js"
 

const feed = document.getElementById("feed")
const tweetBtn = document.getElementById("tweet-btn")
const tweetInput = document.getElementById("tweet")


document.addEventListener("click",function(e){

    if (e.target.dataset.like){
    
        handleLikeClick(e.target.dataset.like)
        render()
        
    }
    if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
        render()
    }
    if (e.target.dataset.comment){
        handleCommentClick(e.target.dataset.comment)
        
    }
    
})

tweetBtn.addEventListener("click",addTweet)

function addTweet(){

    if(tweetInput.value != ""){
        tweetsData.unshift({
        handle: "@TROID",
        profilePic: "images/scrimbalogo.png",
        likes:0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isRetweeted: false,
        isLiked: false,
        uuid: crypto.randomUUID(),

    })

    render()
    tweetInput.value = ""
    }
    
}

function handleLikeClick(tweetId){

    const targetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId

        
    })[0]

    if (!targetObj.isLiked){
        targetObj.likes++
        
    }else{
        targetObj.likes--
    }

    render()
    targetObj.isLiked = !targetObj.isLiked

}

function handleRetweetClick(tweetId){
    const targetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(!targetObj.isRetweeted){
        targetObj.retweets++
    }else{
        targetObj.retweets--
    }
    targetObj.isRetweeted = !targetObj.isRetweeted
    render()
    
}

function handleCommentClick(tweetId){

    const commentEl = document.getElementById(`replies-${tweetId}`)

    commentEl.classList.toggle("hidden")
    

    


    

}

function getFeedHtml(){
    let render = ""
    tweetsData.forEach(function(tweet){

        let likeIconClass = ""
        let shareIconClass = ""
        let replyHtml = ""

        if (tweet.isLiked){
            likeIconClass = "liked"
            
        }

        if (tweet.isRetweeted){
            shareIconClass = "retweeted"
        }

        if (tweet.replies.length > 0){
            for (let reply of tweet.replies){
                replyHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
            `
            }

        }


        render += `
                <div class="tweet">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment" data-comment=${tweet.uuid}> </i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-heart ${likeIconClass}" data-like=${tweet.uuid}> </i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${shareIconClass}" data-retweet=${tweet.uuid}> </i>
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>  
                    </div>
                    <div class="hidden" id="replies-${tweet.uuid}">
                    ${replyHtml}
                    </div>
                </div>
            
            `
        })

        return render
     

}

function render(){

    const renderHtml = getFeedHtml()
    feed.innerHTML = renderHtml
    

}


render()

