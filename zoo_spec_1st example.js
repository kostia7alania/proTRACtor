describe ("text zoo site for input field on home page", function(){
	it ("to test input field and check text output", function()
		browser.get("http://thetestroom.com/jswebapp/");
		element(by.model("person.name")).sendKeys("sss");
		element(by.binding("person.name").getText().then(function(text){
			console.log(text);
			});
		});
});