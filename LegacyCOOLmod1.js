//DONE: Add Tech to unlock a policy to get people to eat herbs or not. Add grain (wheat, barley, rye, etc.) to make bread. Add Mass graves and crematoriums. 
//DONE: Add Cemetaries, and alter the current religious buildings.
//WIP: Updated some icons for the stylesheet...
//TODO: Add tech to unlock policy to get people to eat raw grains or not. 
//TODO: Add Religous buildings to increase faith and culture. Add priests along with the buildings. 

G.AddData({
name:'Legacy COOL! Mod',
author:'Packerfan-Gamer',
desc:'A mod that adds cool things to the game. Currently have berries, juice, and Mass Graves (oh yes!!), and so much more!',
engineVersion:1,
manifest:'ModManifest.js',
requires:['Default dataset*'],
sheets:{'imageSheet':'https://i.imgur.com/lG1JKpU.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
	{	

	
	//First we add the new resources 
	new G.Res({
		name:'Juice',
		desc:'[Juice] tastes better than [water].',
		icon:[0,1,'imageSheet'],
		turnToByContext:{'eat':{'health':0.08,'happiness':0.2},'decay':{'spoiled food':0.2}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	/*	new G.Res({
		name:'Berry Juice',
		desc:'[Berry Juice] tastes better than [water].',
		icon:[0,1,'imageSheet'],
		turnToByContext:{'eat':{'health':0.07,'happiness':0.1},'decay':{'spoiled food':0.2}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});*/
		new G.Res({
		name:'Berries',
		desc:'[Berries] taste sweet, but spoil quickly.',
		icon:[1,1,'imageSheet'],
		turnToByContext:{'eat':{'health':0.05,'happiness':0.3},'decay':{'spoiled food':0.8}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
		
		//Thorns which come from bushes. can be used to make traps
		new G.Res({
		name:'Thorns',
		desc:'[Thorns] hurt alot!',
		icon:[4,2,'imageSheet'],
		partOf:'misc materials',
		category:'misc',
	});

		new G.Res({
		name:'Archaic Trap',
		desc:'[Archaic Trap, Traps] can be used by the hunters to trap animals. (WIP)',
		icon:[0,0,'imageSheet'],
		category:'gear',
	});
		//New Modes for hunter (I hope I do this right)
		
		G.getDict('hunter').modes['trapping']={name:'Trap Animals',desc:'Trap Animals with Archaic Traps',req:{'Basic Trapping':true},use:{'Archaic Trap':5}};
		G.getDict('hunter').effects.push({type:'gather',context:'hunt',amount:5,max:5,mode:{'trapping':true}});
		
		//New Modes for Artisan to make the traps
		
		G.getDict('artisan').modes['trapmaking']={name:'Make Archaic Traps',desc:'Archaic Traps',req:{'Basic Trapping':true},use:{'stone tools':1}};
		G.getDict('artisan').effects.push({type:'convert',from:{'sticks':1,'Thorns':2},into:'Archaic Trap',every:5,mode:{'trapmaking':true}});
		
		//related Tech!
		
		new G.Tech({
		name:'Basic Trapping',
		desc:'Allows the artisan to make archaic traps, which the hunter can use to trap animals with.',
		icon:[4,2,'imageSheet'],
		cost:{'insight':20},
		req:{'bows':true},
	});
		new G.Tech({
		name:'Stone Trapping',
		desc:'Allows the artisan to make traps out of stone, which the hunter can use to trap animals with. (WIP)',
		icon:[0,0,'imageSheet'],
		cost:{'insight':25},
		req:{'Basic Trapping':true},
	});
		new G.Tech({
		name:'Metal Trapping',
		desc:'Allows the artisan to make metal traps, which the hunter can use to trap animals with. (WIP)',
		icon:[0,0,'imageSheet'],
		cost:{'insight':30},
		req:{'Stone Trapping':true},
	});
		
		
		//Wheat and stuff
		
		new G.Res({
		name:'Wheat',
		desc:'[Wheat] tastes unpleasant but can be used for many things. You can grind wheat into flour, or make beer.',
		icon:[1,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':-0.5,'happiness':-100},'decay':{'spoiled food':0.3,'Wheat':0.7}},
		partOf:'grain',
		category:'food',
	});
	
		new G.Res({
		name:'Wheat Flour',
		desc:'You can bake [Wheat Flour] to make [Wheat Bread].',
		icon:[2,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':-0.5,'happiness':-100},'decay':{'spoiled food':0.2}},
		partOf:'grain',
		category:'food',
	});
	
		new G.Res({
		name:'Wheat Bread',
		desc:'[Wheat Bread] tastes really good.',
		icon:[0,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':3,'happiness':20},'decay':{'spoiled food':0.3,}},
		partOf:'food',
		category:'food',
	});
	
		new G.Res({
		name:'Barley',
		desc:'[Barley] tastes unpleasant but can be used for many things. You can grind it into flour, which is used in bread-making',
		icon:[0,0,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':-0.5,'happiness':-100},'decay':{'spoiled food':0.3}},
		partOf:'grain',
		category:'food',
	});
		
		new G.Res({
		name:'Barley Flour',
		desc:'You can bake [Barley Flour] to make [Barley Bread].',
		icon:[2,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':-0.5,'happiness':-100},'decay':{'spoiled food':0.2}},
		partOf:'grain',
		category:'food',
	});
	
		new G.Res({
		name:'Barley Bread',
		desc:'[Barley Bread] has many health benefits.',
		icon:[0,3,'imageSheet'], //TODO: Image for wheat
		turnToByContext:{'eat':{'health':30,'happiness':10},'decay':{'spoiled food':0.3,}},
		partOf:'food',
		category:'food',
	});
	
		
	
	//Then we augment the base data to incorporate our new resources :
		//adding berries as something that can be gathered from grass
	//G.getDict('grass').res['gather']['Berries']=0.1;
	//adding wheat as something that can come from grass
	G.getDict('grass').res['gather']['Wheat']=0.07;
	G.getDict('grass').res['gather']['Barley']=0.01;
		//adding a new mode to artisans so they can make juice from fruit
	G.getDict('artisan').modes['MakeJuice']={name:'Make Juice',desc:'Use fruit and berries to make juice.',req:{'Juice Making':true},use:{'stone tools':1}};
	//G.getDict('artisan').modes['MakeJuiceBerry']={name:'Make Juice from Berries',desc:'Use Berries to make juice.',req:{'Juice Making':true, 'plant lore II':true},use:{'stone tools':1}};
	G.getDict('artisan').modes['GrindGrain']={name:'Grind Grain into Flour',desc:'Use Grain to make Flour',req:{'Grinding':true},use:{'stone tools':1}};
	//G.getDict('artisan').effects.push({type:'convert',from:{'hot pepper':3,'bees':3},into:{'hot sauce':1},every:3,mode:'hot sauce'});
	G.getDict('artisan').effects.push({type:'convert',from:{'fruit':3},into:{'Juice':3},every:5,mode:'MakeJuice'});
	G.getDict('artisan').effects.push({type:'convert',from:{'Berries':3},into:{'Juice':6},every:5,mode:'MakeJuice'});
		
	G.getDict('artisan').effects.push({type:'convert',from:{'Wheat':1},into:{'Wheat Flour':2},every:5,mode:'GrindGrain'});
	G.getDict('artisan').effects.push({type:'convert',from:{'Barley':1},into:{'Barley Flour':2},every:5,mode:'GrindGrain'});
	//plant lore II Makes Gatherers pick berries
	G.getDict('gatherer').effects.push({type:'gather',context:'gather',what:{'Berries': 1},amount:1,max:1,req:{'plant lore II':true}});
	G.getDict('gatherer').effects.push({type:'gather',context:'gather',what:{'Thorns': 3},amount:1,max:1,req:{'plant lore II':true}});   
	//Then we add a new technology which is required by the gatherers to gain access to the "berry" mode :
	new G.Tech({
		name:'plant lore II',
		desc:'@[gatherer]s can find berries.',
		icon:[2,1,'imageSheet'],
		cost:{'insight':10},
		req:{'plant lore':true},
	});
  //New tech to allow the making of juice
		new G.Tech({
		name:'Juice Making',
		desc:'@[artisan]s can make juice.',
		icon:[2,0,'imageSheet'],
		cost:{'insight':10},
		req:{'plant lore II':true},
	});
		new G.Tech({
		name:'agriculture',
		desc:'Develop more complex ideas surrounding plants. May lead to simple farms and gardens.',
		icon:[0,0,'imageSheet'],
		cost:{'insight':20},
		req:{'plant lore II':true},
	});
	
		new G.Unit({
		name:'small farm',
		desc:'Provides food for your civilization, so you don\'t have too.',
		icon:[0,0,'imageSheet'],
		cost:{'archaic building materials':150},
		use:{'land':3},
		//require:{'worker':3,'stone tools':3},
		modes:{
			'off':G.MODE_OFF,
			'any':{name:'Any',icon:[8,8],desc:'Farm using any random seed you find. You may not get optimal results.',use:{'worker':3,'stone tools':3}},
			'wheat':{name:'Wheat',icon:[1,3,'imageSheet'],desc:'Farm for [Wheat]. It isn\'t very impressive, but it\'ll get you somewhere.',use:{'worker':3,'stone tools':3}},
			/*'salt':{name:'Salt',icon:[11,7],desc:'Mine for [salt].',req:{'prospecting':true},use:{'worker':3,'metal tools':3}},
			'copper':{name:'Copper',icon:[9,8],desc:'Mine for [copper ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':3,'metal tools':3}},
			'tin':{name:'Tin',icon:[13,8],desc:'Mine for [tin ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':3,'metal tools':3}},
			'iron':{name:'Iron',icon:[10,8],desc:'Mine for [iron ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':3,'metal tools':3}},
			'gold':{name:'Gold',icon:[11,8],desc:'Mine for [gold ore] with x5 efficiency.',req:{'prospecting':true},use:{'worker':3,'metal tools':3}},*/
		},
		effects:[
			{type:'gather',context:'gather',amount:10,max:30,mode:'any'},
			{type:'gather',context:'gather',what:{'herb':5},max:30,notMode:'off'},
			{type:'gather',context:'gather',what:{'Wheat':50},max:30,mode:'Wheat'},
			/*{type:'gather',context:'mine',what:{'salt':50},max:30,mode:'salt'},
			{type:'gather',context:'mine',what:{'copper ore':50},max:30,mode:'copper'},
			{type:'gather',context:'mine',what:{'tin ore':50},max:30,mode:'tin'},
			{type:'gather',context:'mine',what:{'iron ore':50},max:30,mode:'iron'},
			{type:'gather',context:'mine',what:{'gold ore':50},max:30,mode:'gold'},
			{type:'function',func:unitGetsConverted({'wounded':1},0.001,0.01,'[X] [people].','mine collapsed, wounding its miners','mines collapsed, wounding their miners'),chance:1/50}*/
		],
		gizmos:true,
		req:{'agriculture':true},
		category:'production',
	});
		
		
		
		
	//new tech to allow mass graves
		new G.Tech({
		name:'Mass Burial',
		desc:'Unlocks Mass Graves, which can store 10 people in one grave.',
		icon:[2,2,'imageSheet'],
		cost:{'insight':20},
		req:{'burial':true},
	});
		
	//new tech to allow cemetaries
		new G.Tech({
		name:'Cemetaries',
		desc:'Unlocks Cemetaries, which can store 50 graves inside.',
		icon:[4,1,'imageSheet'],
		cost:{'insight':25},
		req:{'Mass Burial':true, 'churches':true},
	});
		
		
	//new tech to allow the grinding of wheat and bread-baking
		new G.Tech({
		name:'Grinding',
		desc:'Unlocks the secrets of grinding grain into flour.',
		icon:[3,1,'imageSheet'],
		cost:{'insight':10},
		req:{'sedentism':true},
	});
		new G.Tech({
		name:'Bread Baking',
		desc:'Unlocks the secrets of baking bread.',
		icon:[3,0,'imageSheet'],
		cost:{'insight':15},
		req:{'Grinding':true, 'fire-making':true},
	});
		
		
	//new Modes for firekeepers to make bread from flour
	G.getDict('firekeeper').modes['WheatBread']={name:'Make Wheat Bread',desc:'Use Wheat Flour to make Wheat Bread.',req:{'Bread Baking':true},use:{'stone tools':1}};
	G.getDict('firekeeper').effects.push({type:'convert',from:{'Wheat Flour':1},into:{'Wheat Bread':1},every:5,mode:'WheatBread'});
	G.getDict('firekeeper').effects.push({type:'convert',from:{'Barley Flour':1},into:{'Barley Bread':1},every:5,mode:'WheatBread'});
	
  //New Trait to make people love juice!
  
  new G.Trait({
		name:'Juice Love',
		desc:'@your people appreciate [Juice] twice as much and will be twice as happy from consuming it.',
		icon:[2,0,'imageSheet'],
		chance:10,
		req:{'Juice Making':true},
		effects:[
			{type:'function',func:function(){G.getDict('Juice').turnToByContext['eat']['happiness']=0.2;}}
    ]
    });
    
	//MASS-GRAVES

	
		new G.Unit({
		name:'Mass Grave',
		desc:'@provides 10 [burial spot]s, in which the [corpse,dead] are automatically interred one by one@graves with buried corpses decay over time, freeing up land for more graves<>A simple grave dug into the earth, where the dead may find rest.//Burying your dead helps prevent [health,disease] and makes your people slightly [happiness,happier].',
		icon:[1,2,'imageSheet'],
		cost:{},
		use:{'land':1},
		//require:{'worker':1,'knapped tools':1},
		effects:[
			{type:'provide',what:{'burial spot':10}},
			//{type:'waste',chance:1/100,desired:true},
			{type:'function',func:function(me){
				var buried=G.getRes('burial spot').used;
				if (buried>0 && G.getRes('burial spot').amount>=buried)
				{
					var toDie=Math.min(me.amount,randomFloor(buried*0.0001));
					me.targetAmount-=toDie;
					G.wasteUnit(me,toDie);
					G.getRes('burial spot').amount-=toDie;
					G.getRes('burial spot').used-=toDie;
				}
			}}
		],
		req:{'Mass Burial':true},
		category:'civil',
	});
	
		new G.Unit({
		name:'Cemetary',
		desc:'@provides 50 [burial spot]s, in which the [corpse,dead] are automatically interred one by one@graves with buried corpses decay over time, freeing up land for more graves<>A small cemetary, where the dead may find rest.//Burying your dead helps prevent [health,disease] and makes your people slightly [happiness,happier].',
		icon:[4,0,'imageSheet'],
		cost:{},
		use:{'land':2},
		//require:{'worker':1,'knapped tools':1},
		effects:[
			{type:'provide',what:{'burial spot':50}},
			//{type:'waste',chance:1/100,desired:true},
			{type:'function',func:function(me){
				var buried=G.getRes('burial spot').used;
				if (buried>0 && G.getRes('burial spot').amount>=buried)
				{
					var toDie=Math.min(me.amount,randomFloor(buried*0.00001));
					me.targetAmount-=toDie;
					G.wasteUnit(me,toDie);
					G.getRes('burial spot').amount-=toDie;
					G.getRes('burial spot').used-=toDie;
				}
			}}
		],
		req:{'Cemetaries':true},
		category:'civil',
	});
		
		G.getDict('architect').modes['MassUndertaker']={name:'Mass Undertaker',desc:'Mass Graves!',req:{'Mass Burial':true}};
		
		G.getDict('architect')
		effects:[
		{type:'function',func:function(me){
		var wiggleRoom=5;
		var toMake=Math.min(me.amount-me.idle,Math.max(0,(G.getRes('corpse').amount+wiggleRoom)-(G.getRes('burial spot').amount-G.getRes('burial spot').used)));
		if (toMake>0 && G.canBuyUnitByName('house',toMake))
		{
			G.buyUnitByName('Mass Grave',toMake,true);
		}
	},mode:'MassUndertaker'}
],
		
		
	
	//newTHINGY
	
		new G.Res({
		name:'grain',
		desc:'WIP',
		meta:true,
		visible:true,
		icon:[1,3,'imageSheet'], //TODO: icon (same as wheat)
		tick:function(me,tick)
		{
			if (me.amount>0 && G.checkPolicy('disable spoiling')=='off')
			{
				var stored=Math.min(me.amount,G.getRes('food storage').amount)/me.amount;
				var notStored=1-stored;
				
				var toSpoil=me.amount*0.01*notStored+me.amount*0.0005*stored;
				var spent=G.lose('grain',randomFloor(toSpoil),'decay');
				//G.gain('spoiled food',randomFloor(spent));
			}
		},
	});
	
		
		//CHURCHES!!
		
		new G.Unit({
		name:'House of Worship',
		desc:'A small building thats allows your people to worship their gods.',
		icon:[21,3],
		cost:{'archaic building materials':150},
		use:{'land':1},
		//require:{'worker':3,'metal tools':3},
		effects:[
			{type:'provide',what:{'faith':1}},
			{type:'waste',chance:0.01/1000}
		],
		req:{'building':true, 'religion':true},
		category:'spiritual',
	});

		new G.Unit({
		name:'church',
		desc:'A larger and more centralized building for your people to worship their gods. Allows for greater religious thinking.',
		icon:[21,3],
		cost:{'basic building materials':250},
		use:{'land':1},
		//require:{'worker':3,'metal tools':3},
		effects:[
			{type:'provide',what:{'faith':10}},
			{type:'provide',what:{'spirituality':5}},
			{type:'waste',chance:0.01/1000}
		],
		req:{'construction':true, 'churches':true},
		category:'spiritual',
	});
		new G.Unit({
		name:'cathedral',
		desc:'A large building for your people to worship their gods. Allows for even greater religious thinking.',
		icon:[21,3],
		cost:{'basic building materials':500},
		use:{'land':1},
		//require:{'worker':3,'metal tools':3},
		effects:[
			{type:'provide',what:{'faith':15}},
			{type:'provide',what:{'spirituality':10}},
			{type:'waste',chance:0.01/1000}
		],
		req:{'construction':true, 'cathedrals':true},
		category:'spiritual',
	});
	
		
		new G.Tech({
		name:'religion',
		desc:'Start worshipping several gods and godesses. Early religious thinking. Unlocks [house of worship]',
		icon:[0,0,'imageSheet'],
		cost:{'insight':15},
		effects:[
			{type:'provide',what:{'spirituality':10}},
		],
		req:{'symbolism':true, 'sedentism':true},
	});
	
		new G.Tech({
		name:'churches',
		desc:'Unlocks [church], and greater religious thinking.',
		icon:[0,0,'imageSheet'],
		cost:{'insight':25},
		req:{'religion':true},
	});
		new G.Tech({
		name:'cathedrals',
		desc:'Unlocks [cathedral], and even greater religious thinking.',
		icon:[0,0,'imageSheet'],
		cost:{'insight':30},
		req:{'churches':true},
	});
		new G.Tech({
		name:'temples',
		desc:'Unlocks temple building. (WIP)',
		icon:[0,0,'imageSheet'],
		cost:{'insight':50},
		req:{'cathedrals':true, 'monument-building':true},
	});
	
		
	//new wonder.
	/*
		new G.Unit({
		name:'Great Temple',
		desc:'@leads to the <b>Religious victory Victory</b><>A monument honoring your gods and goddesses.//A temple housing great statues, the Great Temple stands tall, its eternal shadow forever reminding your people of your greatness.',
		wonder:'temple',
		icon:[1,14],
		wideIcon:[0,14],
		cost:{'basic building materials':1000},
		costPerStep:{'basic building materials':100,'precious building materials':30},
		steps:100,
		messageOnStart:'You begin the construction of the Great Temple. People pray to the gods and goddesses in its shadow.',
		finalStepCost:{'population':100},
		finalStepDesc:'To complete the Great Temple, and to show your greatness to your gods, 100 of your [population,People] must be sacrificed.',
		use:{'land':10},
		//require:{'worker':10,'stone tools':10},
		req:{'monument-building':true, 'Cathedrals':true },
		category:'wonder',
	});
	*/
	new G.Policy({
		name:'eat herbs',
		desc:'Your people will eat or not eat [herb]s. <br>Your people <i>could start to starve</i>.',
		icon:[6,12,4,6],
		cost:{'influence':1},
		startMode:'on',
		req:{'rules of food':true},
		effects:[
			{type:'make part of',what:['herb'],parent:'food'},
		],
		effectsOff:[
			{type:'make part of',what:['herb'],parent:''},
		],
		category:'food',
	});

	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	//new G.Trait({
	//	name:'hot sauce madness',
	//	desc:'@your people appreciate [hot sauce] twice as much and will be twice as happy from consuming it.',
	//	icon:[1,1,'spicySheet'],
	//	chance:20,
	//	req:{'hot sauce preparing':true},
	//	effects:[
	//		{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
	//	],
	//});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
		
		
	/*=====================================================================================
	ACHIEVEMENTS
	=======================================================================================
	
	G.legacyBonuses.push(
		{id:'addFastTicksOnResearch',name:'+[X] fast ticks from research',desc:'Additional fast ticks when completing research.',icon:[0,0],func:function(obj){G.props['fastTicksOnResearch']+=obj.amount;}}
	);
	
	//do NOT remove or reorder achievements or saves WILL get corrupted
	
	new G.Achiev({
		tier:0,
		name:'religion',
		desc:'Your people have created a religion. May their prayers be answered.',
		fromUnit:'Church',
		effects:[
			{type:'addFastTicksOnResearch',amount:150}
		],
	});
	*/
}
});
