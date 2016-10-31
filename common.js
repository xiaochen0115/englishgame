      var words = [
      [],
      // ["bag","camera","card","glasses","key","mobile phone","money","mp three","wallet","watch","balloon","bottle opener","candle","coat hanger","comb","dice","flashlight","magnet","suitcase","binoculars","kite","map","newspaper","passport","rucksack","shopping cart","straw","ticket","trashcan"],
      ["bee","butterfly","cat","chicken","dinosaur","dog","dragonfly","elephant","frog","giraffe","hamster","hippo","lion","marienkaefer","monkey","mosquito","parrot","pigeon","rabbit","rat","rhino","snake","tiger","turtle","zebra"],
      ["bull","cat","chick","chicken","cow","cup","dog","duck","duckling","eggs","farm","farmer","fence","goat","goose","hay","horse","house","male sheep","mouse","pig","rabbit","rooster","sheep","shotgun","tractor","truck"],
      ["apple juice","bread","cake","cappucino","cereal","cheese","coffee","cookies","egg","fish","hamburg","hotdog","icecream","milk","octopus","orange juice","pepper","popsicle","salad","salmon","salt","shrimp","spaghetti","steak","sugar","sugar cubes","toast","unagi"],
      ["acorn squash","ananas","apple","apricots","banana","blue berries","cassis","framboise","grape","kiwi","lemon","orange","pear","strawberry","watermelon"],
      ["ambulance","bicycle","bus","car","convertible","double decker bus","fire engine","motorcycle","police car","sail boat","steam boat","truck"],
      ];

      var categories = ["","animals","farm","food","fruits","traffictool"];


      function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
      }

      

