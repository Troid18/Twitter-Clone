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
    })

    
}

function handleCommentClick(tweetId){
    console.log(tweetId)

}


function getFeedHtml(){
    let render = ""
    tweetsData.forEach(function(tweet){

        let likeIconClass = ""

        if (tweet.isLiked){
            likeIconClass = "liked"
            
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
                                    <i class="fa-regular fa-heart ${likeIconClass}" data-like=${tweet.uuid}> </i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet" data-retweet=${tweet.uuid}> </i>
                                    ${tweet.retweets}
                                </span>
                            </div>   
                        </div>            
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

