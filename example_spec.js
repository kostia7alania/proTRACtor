describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('http://www.angularjs.org');

    element(by.model('yourName')).sendKeys('Julie');

    var greeting = element(by.binding('yourName'));

    expect(greeting.getText()).toEqual('Hello Julie!');
  });

  describe('todo list', function() {
    var todoList;

    beforeEach(function() {
      browser.get('http://www.angularjs.org');

      todoList = element.all(by.repeater('todo in todoList.todos'));
    });

    it('should list todos', function() {
      expect(todoList.count()).toEqual(2);
      expect(todoList.get(1).getText()).toEqual('build an AngularJS app');
    });

    it('should add a todo', function() {
      var addTodo = element(by.model('todoList.todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
  });
});



	   it('тестим имя страны',function() {
        browser.sleep(100);
     //   var EC = protractor.ExpectedConditions;
       // var elm = browser.wait(EC.presenceOf($('#mainMenu > li:nth-child(3) > span > a')), 5000);
        // if( expect(element(By.id('toggle-switch')).element(By.css('[value="false"]')).isDisplayed()) ) {
    })

    //items[2].sendKeys('2131write first protractor test1235464')
			//expect(items[1].getText()).toBe("George the Turtle");

  /*
     browser.sleep(1000).then(function() {
        expect(browser.getCurrentUrl()).toBe(homeUrl);
   });

        browser.executeScript("document.getElementById('someElem').value = '2011-11-11';");
*/