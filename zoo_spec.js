describe ("ТЕстинг главный тренировочный №2", function() {
	
	it ("должен быть корректный урл", function(){
		browser.get("http://www.thetestroom.com/jswebapp/");
		expect(browser.getCurrentUrl()).toContain("jswebapp");
		// expect(browser.getCurrentUrl()).toEqual("jswebapps");
	
	});
	
	it ("Должен генерировать правильно текст", function(){
		browser.get("http://www.thetestroom.com/jswebapp/");		
		var textMessage = "Subscribe to my chanel to more videos"
		
		element(by.model("person.name")).sendKeys(textMessage);
		element(by.binding("person.name")).getText().then(function(text){
			expect(textMessage).toEqual("Subscribe to my chanel to more videos");
		});
		
	});
	
	it ("\n должен проверять  - пользователь на странице спасибы", function(){
		browser.get("http://www.thetestroom.com/jswebapp/");		
		element(by.buttonText("CONTINUE")).click();
		element(by.model("animal")).$("[value='1']").click();

		// element.all(by.css(".ng-pristine option")).then(function(items) {
			// expect(items.length).toBe(4);
			// expect(items[1].getText()).toBe("George the Turtle");
		// });

		element(by.buttonText("CONTINUE")).click();

		});

		
});