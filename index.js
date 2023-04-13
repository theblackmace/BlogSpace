let blogPostsHtmlArr = [];

function renderPosts() {
    document.getElementById('blog-list').innerHTML = blogPostsHtmlArr.map(function(post) {
            return `<h2>${post.title}</h2><h4>${post.body}</h4><hr>`;
        }).join('');
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(request => request.json())
    .then(data => {
        blogPostsHtmlArr = data.slice(0,5);
        renderPosts();
    });


document.getElementById('post-button').addEventListener('click', function(e) {
    e.preventDefault();
    const post = {
        title: document.getElementById('post-title').value,
        body: document.getElementById('post-body').value
    }

    fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(request => request.json())
        .then(data => {
            blogPostsHtmlArr.unshift(data);
            renderPosts();
            document.querySelector('form').reset();
        });
});