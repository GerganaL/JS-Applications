const viewBtn = document.getElementById('btnViewPost');

function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
  
   viewBtn.addEventListener('click', displayPost);
   viewBtn.disabled = true;


}

attachEvents();

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);
    const data = await response.json();

    const select = document.getElementById('posts');
    select.innerHTML = '';

    Object.values(data).map(createOption).forEach(o => select.appendChild(o));

    viewBtn.disabled = false;
    
}

function createOption(post) {
    const result = document.createElement('option');
    result.textContent = post.title;
    result.value = post.id;
    return result;
}

function displayPost() {
    const postId = document.getElementById('posts').value;
    getCommentsById(postId);

}

async function getCommentsById(postId) {
    const commentUl = document.getElementById('post-comments');
    commentUl.innerHTML = '';

const postUrl = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

const [postResponse, commentsResponse] = await Promise.all([
    fetch(postUrl),
    fetch(commentsUrl)
])

   // const postResponse = await fetch(postUrl);
    const postData = await postResponse.json();

    document.getElementById('post-title').textContent = postData.title;
    document.getElementById('post-body').textContent = postData.body;


   
  //  const commentsResponse = await fetch(commentsUrl);
    const commentsData = await commentsResponse.json();
    const comments = Object.values(commentsData).filter(c => c.postId == postId);

    comments.map(createComment).forEach(c => commentUl.appendChild(c));

}

function createComment(comment) {
    const result = document.createElement('li');
    result.textContent = comment.text;
    result.id = comment.id;
    return result;
}

