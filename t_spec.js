var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(500);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

browser.ignoreSynchronization = true;

describe('Тестовое задание на сайте Тинькоффа', function(){

    it(`1.Переходом по адресу https://www.tinkoff.ru/ загрузить стартовую страницу Tinkoff Bank.`,function() {
        browser.driver.get('https://www.tinkoff.ru');
    });

    it('2. Из верхнего меню, нажатием на пункт меню “Платежи“, перейти на страницу “Платежи“',function() {
        var el = by.css('#mainMenu > li:nth-child(3) > span > a');
        var el = browser.driver.findElement(el);
        //expect(el.getAttribute('textContent')).toBe('Платежи')
        el.click();
    })

    it ('3. В списке категорий платежей, нажатием на пункт Коммунальные платежи, перейти на  страницу выбора поставщиков услуг`',function() {
         browser.driver.findElement(by.css('li:nth-child(2) > .ui-menu__link> a')).click();
    })

    it('4. Убедиться, что текущий регион – “г. Москва” (в противном случае выбрать регион “г. Москва” из списка регионов).',function(){
    browser.sleep(555)
	    //el =  $('.payment-page__title_inner')
        var el = browser.driver.findElement(by.css('.payment-page__title_inner'));
    el.getText().then(function(txt){
       if(txt!="Москве") {
			el.click();
            browser.driver.findElement(by.css('.ui-regions__layout > div > div:nth-child(1)>span')).click();
      }
    })


    })

    it('5. Со страницы выбора поставщиков услуг, выбрать 1-ый из списка (Должен быть “ЖКУ-Москва”). Сохранить его наименование (далее “искомый”) и нажатием на соответствующий элемент перейти на страницу оплаты “ЖКУ-Москва“.',function(){
       //ЖКУ-Москва
       искомый = browser.driver.findElement(by.css('li:nth-child(1) > .ui-menu__link_icons > a')).getAttribute('textContent'); // =сохраняем ИСКОМОГО);
       browser.driver.findElement(by.css('li:nth-child(1) > .ui-menu__link_icons > a')).click();
       url5step = browser.getCurrentUrl();
    })

    it('6. На странице оплаты, перейти на вкладку “Оплатить ЖКУ в Москве“.',function(){
       console.log(искомый)
        browser.driver.findElement(by.css('.ui-menu-second__item:nth-child(2) > span > a')).click(); //открываем вторую вкладку:
    })

    it('7.Выполнить проверки на невалидные значения для обязательных полей: проверить все текстовые сообщения об ошибке,которые появляются под соответствующим полем ввода в результате ввода некорректных данных',function(){
        //тестим значения инпутов
       // element.all(by.css(".ui-input__label")).then(function(items) {
       // browser.driver.get('https://www.tinkoff.ru/zhku-moskva/oplata');
        browser.sleep(222);
        browser.driver.findElement(by.css(".ui-form__component>.ui-button")).click();
        browser.sleep(222);
     })

    it('7.1 Тестируем пустые поля; по-хорошему - выводится сообщение "поле обязательное"',function() {
        $$('.ui-form-field-error-message.ui-form-field-error-message_ui-form').then(function (items) {
            //expect(items.length).toBe(3);
            for (i = 0; i < items.length; i++) {
                //console.log(items[i].getText())
                expect(items[i].getText()).toBe('Поле обязательное');
            }
        });
    })

    it ('7.2. Тестируем не полный КОД ПЛАТЕЛЬЩИКА; по-хорошему - выводится сообщение "Поле неправильно заполнено', function(){
        browser.driver.findElement(by.id('payerCode')).clear();
        browser.driver.findElement(by.css("#payerCode")).sendKeys(Math.floor(Math.random() * 100000))
        browser.driver.findElement(by.css(".ui-form__component>.ui-button")).click();
        browser.sleep(555).then(function() {
             expect(browser.driver.findElement(by.css(".ui-form>div:nth-child(1)>div > div:nth-child(2)")).getText()).toBe("Поле неправильно заполнено")
        });
    });

    it ('7.3. Тестируем 2ое обязательное поле; по-хорошему - выводится сообщение "Поле заполнено некорректно', function(){
        browser.driver.findElement(by.css("input[name='provider-period']")).clear();
        browser.driver.findElement(by.css("input[name='provider-period']")).sendKeys(Math.floor(Math.random() * 100000))
        browser.driver.findElement(by.css(".ui-form__component>.ui-button")).click();
        browser.sleep(555).then(function() {
             expect(browser.driver.findElement(by.css(".ui-form>div:nth-child(2)>div > div:nth-child(2)")).getText()).toBe("Поле заполнено некорректно")
        });
    });

    it ('7.4. Тестируем 3ее обязательное поле; по-хорошему - выводится сообщение "Минимальная сумма перевода - 10 ₽', function(){
        browser.driver.findElement(by.css(".ui-form>div:nth-child(4)>div > div:nth-child(1)>div:nth-child(1)>div>div>div>div>div:nth-child(1)>label>div>input")).clear();
        browser.driver.findElement(by.css(".ui-form>div:nth-child(4)>div > div:nth-child(1)>div:nth-child(1)>div>div>div>div>div:nth-child(1)>label>div>input")).sendKeys(Math.floor(Math.random() * 10))
        browser.driver.findElement(by.css(".ui-form__component>.ui-button")).click();
        browser.sleep(555).then(function() {
             expect(browser.driver.findElement(by.css(".ui-form>div:nth-child(4)>div>div>div>div>div>div>div>div:nth-child(2)")).getText()).toBe("Минимальная сумма перевода - 10 ₽")
        });
    });

    it ('8. Повторить шаг (2)', function(){
        browser.driver.findElement(by.css('#mainMenu > li:nth-child(3) > span > a')).click();
    });

//var искомый = "ЖКУ-Москва"

     it ('9.В строке быстрого поиска поставщика услуг ввести наименование искомого (ранее сохраненного)', function(){
        browser.driver.findElement(by.css('._2XFoD._1phV_')).click();
        browser.driver.findElement(by.css('._2XFoD._1phV_')).sendKeys(искомый);
    });

    it('10.Убедиться, что в списке предложенных провайдеров искомый поставщик первый.',function() {
        browser.sleep(1000).then(function() {
            expect(browser.driver.findElement(by.css('.ui-layout>div>div>div>div>div>div>div>div>div>div>div>div:nth-child(1)>div>div:nth-child(1)>div')).getText()).toContain(искомый);
        });
    })

     it('11.1. Нажатием на элемент, соответствующий искомому, перейти на страницу _Оплатить ЖКУ в Москве_',function() {
            browser.driver.findElement(by.css('.ui-layout>div>div>div>div>div>div>div>div>div>div>div>div:nth-child(1)>div>div:nth-child(1)>div')).click();
    })

    //  var url5step="https://www.tinkoff.ru/zhku-moskva/oplata/"

    it('11.2 Убедиться, что загруженная страница та же, что и страница, загруженная в результате шага (5)',function() {
        browser.sleep(1000).then(function() {
            expect(url5step).toContain(browser.getCurrentUrl())
        });
    })

    it('12. Выполнить шаги (2) и (3).',function() {
        browser.driver.findElement(by.css('#mainMenu > li:nth-child(3) > span > a')).click()
        browser.driver.findElement(by.css('li:nth-child(2) > .ui-menu__link> a')).click();
    })

    it('13. В списке регионов выбрать “г. Санкт-Петербург”.',function() {
        browser.sleep(1000).then(function() {
            browser.driver.findElement(by.css('.payment-page__title_inner')).click();                               //клик по Москве
        })
        browser.sleep(1111).then(function() {
            browser.driver.findElement(by.css('.ui-regions__layout > div > div:nth-child(2)>span')).click();    //выбираем питер
        })
    })

    it('14. Yбедиться, что в списке поставщиков на странице выбора поставщиков услуг отсутствует искомый',function() {
        $$('.ui-menu__link_logo').then(function(items) {
            for (i = 0; i < items.length; i++) {
                expect(items[i]).not.toContain(искомый)
            }
        })
    });


})

