
    $(document).ready(function(){

      //Initialization
      //time
      var timeIndex = 0;
      setTime();
      times = setInterval(setTime, 1000);
      //clearInterval(times);

      var id = getUrlParam('id');
      console.log(id);

      var currentWords = words[id];
      var currentTotalNumber = currentWords.length;
      var currentWordNumber = 1;

      $("#current").text(currentWordNumber);
      $("#total").text(currentTotalNumber);

      var randomWords = getArrayItems(currentWords);
      console.log(randomWords);

      var currentWord = randomWords[currentWordNumber - 1];
      var currentLength = currentWord.length;

      var score = 0;
      var vowel = "aeiou";
      var errorTimes = 0;
      var ERRORLIMIT = 10;
      // var ERRORLIMIT = 1;
      var hitNumber = 0;

      $(".image").click(function() {
        window.location.href = "category.html";
      });
      setGuessLetter();

      $(".letter").click(function(e) {
        guess(e);
      });

      // $(".vowel").on('click','.letter', function() {
      //   guess(e);
      // })

      function updateWord() {
        if (currentWordNumber < currentTotalNumber) {
          currentWordNumber++;
          currentWord = randomWords[currentWordNumber - 1];
          currentLength = currentWord.length;
          $("#current").text(currentWordNumber);
          hitNumber = 0;
        } else {
          //已经成功完成本组单词
          var newPage = "result.html?success=1&time=" + $(".timeValue").text() + "&score=" + score + "&id=" + id;
          location.href = newPage;
        }
      }
      function setTime() {
        var hour = parseInt(timeIndex / 3600);
        var minutes = parseInt((timeIndex % 3600) / 60);
        var seconds = parseInt(timeIndex % 60);
        hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $(".timeValue").text(hour + ":" + minutes + ":" + seconds);
        timeIndex++;
      }

      //生成顺序随机的数组
      function getArrayItems(arr) {
        var temp_array = new Array();
        for (var index in arr) {
          temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i=0; i<arr.length; i++) {
          var arrIndex = Math.floor(Math.random()*temp_array.length);

          return_array[i] = temp_array[arrIndex];
          temp_array.splice(arrIndex, 1);
        }

        return return_array;

      }

      
      function setGuessLetter() {
        //根据长度放置黄色字母方块
        var wordHtml = "";
        for (var i=0; i<currentLength; i++) {
          if ( currentWord[i] != " ") {
            wordHtml += '<img class="imageLetter" ' + 'id="' + i.toString() + '"' + ' src="images/word.png">';
          } else {
            wordHtml += '<img class="blankLetter" ' + 'id="' + i.toString() + '"' + ' src="images/blankLetter.png">'
          }
        }
        // console.log(wordHtml);
        $(".wordGuess").html(wordHtml);
      }

      function resetLetters() {
        $(".vowel").children(".letter").each(function() {
          $(this).attr('src', 'images/letter' + $(this).attr('id').toUpperCase() + '.png');
        });
        $(".consonant").find(".letter").each(function() {
          $(this).attr('src', 'images/letter' + $(this).attr('id').toUpperCase() + '.png');
        });
      }

      function setWordPic() {
        // var wordPicHtml = '<img src="images/' + currentWord + '.png">';
        var wordPicHtml = '<img class="wordPic" src="images/' + categories[id] + '/' + currentWord.replace(/\s/g, "") + '.png"></img>';
        $(".hangman").html(wordPicHtml);
        
      }
      function setFailedLetter() {
        $(".wordGuess").children().each(function(index, domEle) {
          var src = $(domEle).attr('src');
          if (src.indexOf("word.png") >= 0) {
            //未猜中的字母
            $(domEle).attr('src','images/redguess' + currentWord[index].toUpperCase() + '.png');
          }
        });
        $(".leftPanel").hide();
        $(".rightPanel").hide();
      }
      //绘制hangman
      function postHangman() {
        var hangmanHtml;

        switch (errorTimes) {
          case 1:
            hangmanHtml = '<line stroke="#ffff99" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="338" x2="55.5" y1="291" x1="122.5" stroke-width="5" fill="none"/> \
  <line stroke="#ffff99" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_3" y2="335" x2="187.5" y1="293" x1="123.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" fill="none"/>';
            break;
          case 2:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke="#ffff99" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="61" x2="120.5" y1="292" x1="121.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" fill="none"/>';
            break;
          case 3:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke="#ffff99" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_5" y2="60" x2="315.5" y1="64" x1="120.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" fill="none"/>';
            break;
          case 4:
            hangmanHtml = $(".hangmansvg").html() + '<ellipse ry="18" rx="19" id="svg_13" cy="155" cx="364.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#ffff99" fill="none"/>';
            break;
          case 5:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_14" y2="224" x2="367.5" y1="175" x1="366.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#ffff99" fill="none"/>';
            break;
          case 6:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_15" y2="191" x2="346.5" y1="175" x1="365.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#ffff99" fill="none"/>';
            break;
          case 7:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_16" y2="185" x2="387.5" y1="176" x1="366.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#ffff99" fill="none"/>';
            break;
          case 8:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_17" y2="245" x2="356.5" y1="222" x1="367.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#ffff99" fill="none"/>';
            break;
          case 9:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_18" y2="244" x2="386.5" y1="221" x1="368.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#ffff99" fill="none"/>';
            break;
          case 10:
            hangmanHtml = $(".hangmansvg").html() + '<line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_19" y2="160" x2="346.5" y1="60" x1="313.5" fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#ffff99" fill="none"/>';
            break;
          default:
            hangmanHtml = "";
        }
            
          $(".hangmansvg").html(hangmanHtml);
      }

      //点击字母猜单词
      function guess(e) {
         if ($(e.target).attr("src").indexOf("blankLetter.png") > 0) {
          //此字母已经被点击过，不再考虑点击
          return;
         }

        if (hitNumber != currentLength && errorTimes < ERRORLIMIT) {
            

          var letterClicked = $(e.target).attr("id");
          $(e.target).attr('src', 'images/blankLetter.png');
          // $(e.target).attr('class', 'hideLetter');
          var hitIndex = currentWord.indexOf(letterClicked);
          console.log('hitIndex: '+hitIndex);
          if (hitIndex < 0 ) {
            //未命中
            score -= 10;
            $(".scoreValue").text(score);

            //如果是辅音，需要画小人
            console.log(letterClicked);
            console.log(vowel);
            console.log(vowel.indexOf(letterClicked));
            if (vowel.indexOf(letterClicked) < 0) {
              errorTimes++;

              postHangman();
              // var hangmanHtml = '<img class="hangmanPic" src="images/hangman' + errorTimes.toString() + '.png">';
              // console.log(hangmanHtml);
              // $(".hangman").html(hangmanHtml);

              if(errorTimes == ERRORLIMIT) {
                //跳转失败页面
                var newPage = "result.html?success=0&time=" + $(".timeValue").text() + "&score=" + score + "&id=" + id;
                //未猜出的字母放置红色图片
                setFailedLetter();
                setTimeout(function() {
                  location.href = newPage;
                }, 3000);
                

              }
            }

          } else {
            while(hitIndex >= 0) {
              hitNumber++;

              //$(".wordGuess").find("img").get(hitIndex).attr('src',"images/letterA.png");
              $('#'+hitIndex.toString()).attr('src','images/guess' + letterClicked.toUpperCase() + '.png');
              score += 50;
              $(".scoreValue").text(score);
              hitIndex = currentWord.indexOf(letterClicked, hitIndex + 1);
              if (hitNumber == currentLength) {
                //正确猜出，hangman区域放置单词图片，然后跳转下一个单词
                setWordPic();
                //放置2s后取消图片
                setTimeout(function() {
                  $(".hangman").html("");
                  updateWord(); //确定下一个要猜的单词
                  resetLetters();  //恢复字母区的字母摆放
                  setGuessLetter(); //重置猜词区的方格摆放
                }, 3000);
              }
            }
          }
        }
      
      }


    });
