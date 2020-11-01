# node-api-server-tutorial
This is a simple introduction to creating a REST service and api with node

We will show you how to create a simple REST back end

# Setting up nginx

Before you will be able to get to your node.js server on a particular port, you will need to allow the browser to access that port through a proxy.  First edit your /etc/nginx/sites-available/default file and add the following proxy location.
```
        location /node {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
```
Then test to make sure your nginx configuration is correct
<pre>
sudo nginx -t
</pre>
And if all is well, restart nginx
<pre>
sudo systemctl restart nginx
</pre>

## Creating the Front End
We aren't going to have you build the front end, we will just have you check it out from git.

First checkout this repository
<pre>
git clone https://github.com/BYUCS260/node-api-server-tutorial.git
</pre>

If express is not already installed, install it in the global location so you dont have to install it for every application you build.
<pre>
npm install -g express-generator 
npm install -g express
</pre>
Next, create a new express server with
<pre>
express poki
cd poki
npm install
cd ..
</pre>

Now copy the files into the correct places in the template
<pre>
cp node-api-server-tutorial/src/index.html poki/public
cp node-api-server-tutorial/src/style.css  poki/public/stylesheets/
cp node-api-server-tutorial/src/app.js  poki/public/javascripts/
</pre>

Now create a route to the index.html by editing routes/index.js to be
<pre>
router.get('/node', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});
</pre>

## Running the server
You are going to run your server using the command "npm start".  This will run the script located in "bin/www"  The script will open the server on the port found in the "PORT" environment variable.  You can see the environment variables you have set by running
<pre>
env
</pre>
from the command line.

Set your environment variable so that express will use port 3000 by the following command line 
<pre>
export PORT=3000
</pre>

Now add a console.log so you can see which port you are using. Add this to "bin/www"
<pre>
var port = normalizePort(process.env.PORT || '3000');
console.log("Starting on "+port);
app.set('port', port);
</pre>
Make sure the server is running correctly by running 
<pre>
npm start
</pre>
and accessing the URL 'http://yourserver/node'

You should see that you havent set up the '/pokemon' route

First add the route and make sure it works when you access 'http://yourserver/node/pokemon'
<pre>
router.get('/node/pokemon', function(req, res) {
  console.log("In Pokemon");
});
</pre>

Then add the pokemon array from node-api-server-tutorial/api-server.js
```javascript
var pokemon = [
  {
    name: 'Pikachu',
    avatarUrl: 'http://rs795.pbsrc.com/albums/yy232/PixKaruumi/Pokemon%20Pixels/Pikachu_Icon__free__by_Aminako.gif~c200'
  },
  {
    name: 'Charmander',
    avatarUrl: 'http://24.media.tumblr.com/tumblr_ma0tijLFPg1rfjowdo1_500.gif'

  },
  {
    name: 'Mew',
    avatarUrl: 'http://media3.giphy.com/media/J5JrPT8r1xGda/giphy.gif'
  },
  {
    name: 'Cubone',
    avatarUrl: 'http://rs1169.pbsrc.com/albums/r511/nthndo/tumblr_ljsx6dPMNm1qii50go1_400.gif~c200'
  },
  {
    name: 'Cleffa',
    avatarUrl: 'http://media1.giphy.com/media/pTh2K2xTJ1nag/giphy.gif'
  },
  {
    name: 'Gengar',
    avatarUrl: 'https://s-media-cache-ak0.pinimg.com/originals/7e/3b/67/7e3b67c53469cc4302035be70a7f2d60.gif'
  }
];
```

Now, send back the array in your route
```
res.send(pokemon);
```
Refresh your front end and you should be able to see the array of pokemon.

## CORS Issues

Some of you may want to access a REST service that doesnt have the CORS headers for your project.  Lets go through an example of how to do this

Lets say we want to get information about candidates from 'https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod'

If we put the URL into our vue javascript code  at public/javascripts/app.js with something like
```javascript
    async getpolitics() {
      // `this` points to the vm instance
      console.log("politics");
      var url = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod"
      try {
        let response = await axios.get(url);
        this.politics = response.data;
        console.log(this.politics);
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
```
and add a call to this function in the "created" function
```javascript
  created: function() {
    this.getpokis();
    this.getpolitics();
  },
```
And add politics as an array in the data object
```
data: {
    pokis: [],
    politics:[],
    pokiName: '',
    pokiURL: '',
  },
```
You will get a CORS error on the console of your browser.

So, lets make a proxy for this route in routes/index.js

First add the request module to the top of your routes/index.js file
```
var request = require('request')
```
Then install the module
<pre>
npm install request --save
</pre>

Then use 'request' to pipe the output from the real URL back through the node server to your browser.
```javascript
var politics = "https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod";
router.get('/politics', function(req,res) {
  console.log("In politics");
  request(politics).pipe(res);
});
```

Test the route by accessing the URL 'http://yourserver/node/politics'

And change the axios call to point to this route in public/javascripts/app.js
```
var url = "http://yourserver/node/politics";
```

Then add some vue code to display the results in index.html
```
    <div v-if='politics.length'>
      <ul>
        <li v-for="item in politics">
          <h1>{{ item.Name }}</h1>
        </li>
      </ul>
    </div>
```
## What about saving a new pokimon?

First add a form to the public/index.html file.
```
    <h1> Enter A New Poki</h1>
    <form v-on:submit.prevent="addItem">
      Name: <input type="text" v-model="pokiName">
      URL: <input type="url" v-model="pokiURL">
      <button type="submit">Add</button>
    </form>
```

And add the function to execute on the submit inside of app.js
```javascript
    addItem() {
      var url = "http://yourserver/node/pokemon";
      axios.post(url, {
          name: this.pokiName,
          avatarUrl: this.pokiURL
        })
        .then(response => {})
        .catch(e => {
          console.log(e);
        });
      this.pokiName = '';
      this.pokiURL = '';
      this.getpokis();
    },
```
And now we need to build the back end.  We have created an object that should be pushed directly into the array on the back end.  Once we update the array, it should be permanent even if you refresh the browser.  Edit routes/index.js
```javascript
router.post('/node/pokemon', function(req, res) {
    console.log("In Pokemon Post");
    console.log(req.body);
    pokemon.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 
```
You should be able to refresh your browser and still see the new pokemon.
