class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    background(yellow);
    
    this.title.hide();
    this.input1.hide();
    this.button.hide();
    this.input2.hide();

    var title = createElement('h2');
    title.html("the result of the quiz");
    title.position(130,15);

     getContestantInfo() ;

    if(allcontestants!==undefined){
      fill("blue");
      textsize(20);
      text("*NOTE: contestant who answered correct are highlighted in green color!",130,230);
    }

    for(var plr in allcontestants){
      var correctAns = "3";
      if(correctAns === allcontestants[plr].answer){
        fill("green");
      }else{
        fill("red"); 
      }
    }
  }

}
