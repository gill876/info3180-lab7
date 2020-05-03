/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>

          <li class="nav-item">
            <router-link to="/upload" class="nav-link">Upload</router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});

const Home = Vue.component('home', {
   template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
   `,
    data: function() {
       return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
})

const UploadForm = Vue.component('upload-form', {
    template: `
    <div class="row">
        <div class="col">
            <div v-for="message in messages.message">
                <div v-if="message.description">
                    {{message.description}}
                </div>
                <div v-if="message.errors">
                    <div v-for="error in message.errors" class="alert alert-danger" role="alert">
                        {{error}}
                    </div>
                </div>
            </div>
            <form id="uploadForm" @submit.prevent="uploadPhoto" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <!--<label for="description">Description</label>-->
                    <textarea name="description" class="form-control" id="description" placeholder="Description" rows="3"></textarea>
                </div>

                <div class="custom-file">
                    <input name="photo" type="file" class="custom-file-input" id="photo" >
                    <label class="custom-file-label" for="photo">Choose Photo</label>
                </div>
                <hr>
                <button type="submit" class="btn btn-primary">Submit</button>
                <br>
                <br>
            </form>
        </div>
    </div>
    `,
    data: function () {
        return {
            messages: ''
        }
    },

    methods: {
        uploadPhoto: function() {
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);
            fetch("/api/upload", { method: 'POST', body: form_data, headers: { 'X-CSRFToken': token }, credentials: 'same-origin'}).then(function (response) {
                return response.json();
                }).then(function (jsonResponse) {
                    // display a success message
                    //console.log(jsonResponse);
                    self.messages = jsonResponse;
                }).catch(function (error) {
                        console.log(error);
                    });
        }
    }
})

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        // Put other routes here
        {path: "/upload", component: UploadForm},
        // This is a catch all route in case none of the above matches
        {path: "*", component: NotFound}
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});