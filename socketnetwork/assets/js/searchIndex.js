
var camelCaseTokenizer = function (builder) {

  var pipelineFunction = function (token) {
    var previous = '';
    // split camelCaseString to on each word and combined words
    // e.g. camelCaseTokenizer -> ['camel', 'case', 'camelcase', 'tokenizer', 'camelcasetokenizer']
    var tokenStrings = token.toString().trim().split(/[\s\-]+|(?=[A-Z])/).reduce(function(acc, cur) {
      var current = cur.toLowerCase();
      if (acc.length === 0) {
        previous = current;
        return acc.concat(current);
      }
      previous = previous.concat(current);
      return acc.concat([current, previous]);
    }, []);

    // return token for each string
    // will copy any metadata on input token
    return tokenStrings.map(function(tokenString) {
      return token.clone(function(str) {
        return tokenString;
      })
    });
  }

  lunr.Pipeline.registerFunction(pipelineFunction, 'camelCaseTokenizer')

  builder.pipeline.before(lunr.stemmer, pipelineFunction)
}
var searchModule = function() {
    var documents = [];
    var idMap = [];
    function a(a,b) { 
        documents.push(a);
        idMap.push(b); 
    }

    a(
        {
            id:0,
            title:"EncryptAlgorithms",
            content:"EncryptAlgorithms",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Encrypt/EncryptAlgorithms',
            title:"EncryptAlgorithms",
            description:""
        }
    );
    a(
        {
            id:1,
            title:"SocketServer",
            content:"SocketServer",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Server/SocketServer',
            title:"SocketServer",
            description:""
        }
    );
    a(
        {
            id:2,
            title:"NetworkProtocol",
            content:"NetworkProtocol",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork/NetworkProtocol',
            title:"NetworkProtocol",
            description:""
        }
    );
    a(
        {
            id:3,
            title:"ClientDataEventArgs",
            content:"ClientDataEventArgs",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Events/ClientDataEventArgs',
            title:"ClientDataEventArgs",
            description:""
        }
    );
    a(
        {
            id:4,
            title:"ClientConnection",
            content:"ClientConnection",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Client/ClientConnection',
            title:"ClientConnection",
            description:""
        }
    );
    a(
        {
            id:5,
            title:"ServerClientEventArgs",
            content:"ServerClientEventArgs",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Events/ServerClientEventArgs',
            title:"ServerClientEventArgs",
            description:""
        }
    );
    a(
        {
            id:6,
            title:"SocketEncryptor",
            content:"SocketEncryptor",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Encrypt/SocketEncryptor',
            title:"SocketEncryptor",
            description:""
        }
    );
    a(
        {
            id:7,
            title:"SendBytesTo",
            content:"SendBytesTo",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Client/SendBytesTo',
            title:"SendBytesTo",
            description:""
        }
    );
    a(
        {
            id:8,
            title:"ServerDataEventArgs",
            content:"ServerDataEventArgs",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Events/ServerDataEventArgs',
            title:"ServerDataEventArgs",
            description:""
        }
    );
    a(
        {
            id:9,
            title:"SocketServerPool",
            content:"SocketServerPool",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Server/SocketServerPool',
            title:"SocketServerPool",
            description:""
        }
    );
    a(
        {
            id:10,
            title:"ServerObjectEventArgs",
            content:"ServerObjectEventArgs",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Events/ServerObjectEventArgs',
            title:"ServerObjectEventArgs",
            description:""
        }
    );
    a(
        {
            id:11,
            title:"ClientObjectEventArgs",
            content:"ClientObjectEventArgs",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Events/ClientObjectEventArgs',
            title:"ClientObjectEventArgs",
            description:""
        }
    );
    a(
        {
            id:12,
            title:"Constants",
            content:"Constants",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork/Constants',
            title:"Constants",
            description:""
        }
    );
    a(
        {
            id:13,
            title:"SocketClient",
            content:"SocketClient",
            description:'',
            tags:''
        },
        {
            url:'/socketnetwork/api/SToolkit.SocketNetwork.Client/SocketClient',
            title:"SocketClient",
            description:""
        }
    );
    var idx = lunr(function() {
        this.field('title');
        this.field('content');
        this.field('description');
        this.field('tags');
        this.ref('id');
        this.use(camelCaseTokenizer);

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
        documents.forEach(function (doc) { this.add(doc) }, this)
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
