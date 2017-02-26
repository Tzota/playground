const user = {
    email: 'james@example.com',
    accountDetails: {
        address: {
            street:   '123 Fake St',
            city:     'Exampleville',
            province: 'NS',
            postcode: '1234'
        }
    },
    preferences: {}
};

const banners = {
    'AB': '/assets/banners/alberta.jpg',
    'BC': '/assets/banners/british-columbia.jpg',
    'MB': '/assets/banners/manitoba.jpg',
    'NL': '/assets/banners/newfoundland-labrador.jpg',
    'NS': '/assets/banners/nova-scotia.jpg',
    'NT': '/assets/banners/northwest-territories.jpg',
    'ON': '/assets/banners/ontario.jpg',
    'PE': '/assets/banners/prince-edward.jpg',
    'QC': '/assets/banners/quebec.jpg',
    'SK': '/assets/banners/saskatchewan.jpg',
    'YT': '/assets/banners/yukon.jpg',
};

console.log('-------------------простой вариант------------------------');

{

    let getUserBanner = function(banners, user) {
        return banners[user.accountDetails.address.province];
    }

    console.log(getUserBanner(banners, user));

}

console.log('-------------------простой вариант с ramda------------------------');

{
    let R       = require('ramda'),
        compose = R.compose,
        prop    = R.prop,
        path    = R.path;

    let getUserBanner = compose(
        prop(R.__, banners),
        path(['accountDetails', 'address', 'province'])
    );

    console.log(getUserBanner(user));
}

console.log('-------------------простой вариант с проверками------------------------');

{

    let getUserBanner = function(banners, user) {
        if ((user !== null)
            && (user.accountDetails !== undefined)
            && (user.accountDetails.address !== undefined)) {
            return banners[user.accountDetails.address.province];
        }
        return  '-';
    }

    console.log(getUserBanner(banners, null));
    console.log(getUserBanner(banners, {}));
    console.log(getUserBanner(banners, user));
}

console.log('-------------------maybe------------------------');

{
    let R       = require('ramda'),
        prop    = R.prop;

    let Maybe = function(val) {
        this.__value = val;
    };

    Maybe.of = function(val) {
        return new Maybe(val);
    };

    Maybe.prototype.isNothing = function() {
        return (this.__value === null || this.__value === undefined);
    };

    Maybe.prototype.map = function(f) {
        if (this.isNothing()) {
            return Maybe.of(null);
        }
        return Maybe.of(f(this.__value));
    };

    let getUserBanner = function(banners, user) {
        return Maybe.of(user)
            .map(prop('accountDetails'))
            .map(prop('address'))
            .map(prop('province'))
            .map(prop(R.__, banners));
    }

    console.log(getUserBanner(banners, null));
    console.log(getUserBanner(banners, {}));
    console.log(getUserBanner(banners, user));
}

console.log('-------------------maybe not------------------------');

{
    let R       = require('ramda'),
        prop    = R.prop;

    let Maybe = function(val) {
        this.__value = val;
    };

    Maybe.of = function(val) {
        return new Maybe(val);
    };

    Maybe.prototype.isNothing = function() {
        return (this.__value === null || this.__value === undefined);
    };

    Maybe.prototype.map = function(f) {
        if (this.isNothing()) {
            return Maybe.of(null);
        }
        return Maybe.of(f(this.__value));
    };

    let getProvinceBanner = function(province) {
        return Maybe.of(banners[province]);
    };

    let getUserBanner = function(user) {
        return Maybe.of(user)
            .map(prop('accountDetails'))
            .map(prop('address'))
            .map(prop('province'))
            .map(getProvinceBanner);
    }

    getUserBanner(user)
        .map(function(m) {
            m.map(function(banner) {
                console.log(banner);
            })
        });
}

console.log('-------------------maybe join chain------------------------');

{
    let R       = require('ramda'),
        prop    = R.prop;

    let Maybe = function(val) {
        this.__value = val;
    };

    Maybe.of = function(val) {
        return new Maybe(val);
    };

    Maybe.prototype.isNothing = function() {
        return (this.__value === null || this.__value === undefined);
    };

    Maybe.prototype.map = function(f) {
        if (this.isNothing()) {
            return Maybe.of(null);
        }
        return Maybe.of(f(this.__value));
    };

    Maybe.prototype.join = function() {
        return this.__value;
    };

    Maybe.prototype.chain = function(f) {
        return this.map(f).join();
    };

    let getProvinceBanner = function(province) {
        return Maybe.of(banners[province]);
    };

    let getUserBanner = function(user) {
        return Maybe.of(user)
            .map(prop('accountDetails'))
            .map(prop('address'))
            .map(prop('province'))
            .chain(getProvinceBanner);
    }

    getUserBanner(user)
        .map(function(val){
            console.log(val);
        })
}

console.log('-------------------orElse------------------------');

{
    let R       = require('ramda'),
        prop    = R.prop,
        curry   = R.curry;

    let Maybe = function(val) {
        this.__value = val;
    };

    Maybe.of = function(val) {
        return new Maybe(val);
    };

    Maybe.prototype.isNothing = function() {
        return (this.__value === null || this.__value === undefined);
    };

    Maybe.prototype.map = function(f) {
        if (this.isNothing()) {
            return Maybe.of(null);
        }
        return Maybe.of(f(this.__value));
    };

    // разворачивает монаду
    Maybe.prototype.join = function() {
        return this.__value;
    };

    // map + join, чтобы не зарываться внутрь на ещё одну монаду
    Maybe.prototype.chain = function(f) {
        return this.map(f).join();
    };

    // значение по умолчанию
    Maybe.prototype.orElse = function(def) {
        if (this.isNothing()) {
            return Maybe.of(def);
        }

        return this;
    };

    //  method that applies the wrapped function to our Maybe with a value
    Maybe.prototype.ap = function(someOtherMaybe) {
        return someOtherMaybe.map(this.__value);
    }

    let getProvinceBanner = function(province) {
        return Maybe.of(banners[province]);
    };

    let getUserBanner = function(user) {
        return Maybe.of(user)
            .map(prop('accountDetails'))
            .map(prop('address'))
            .map(prop('province'))
            .chain(getProvinceBanner);
    }

    // Provide a default banner with .orElse()
    let bannerSrc = getUserBanner(user)
             .orElse('/assets/banners/default-banner.jpg');

    // Grab the banner element and wrap it in a Maybe too.
    // let bannerEl = Maybe.of(document.querySelector('.banner > img'));
    let bannerEl = Maybe.of({src:''});

    var applyBanner = curry(function(el, banner) {
        el.src = banner;
        return el;
    });

    // We get a function wrapped in a Maybe.
    console.log(bannerEl.map(applyBanner));

    // жесть. Объект; суем его в каррированную функцию; получаем монаду; вызываем на ней другую монаду
    console.log(bannerEl.map(applyBanner).ap(bannerSrc));

    let liftA2 = curry(function(fn, m1, m2) {
        return m1.map(fn).ap(m2);
    });
    let applyBannerMaybe = liftA2(applyBanner);
    let mutatedBanner    = applyBannerMaybe(bannerEl, bannerSrc);
    console.log(mutatedBanner);
}

console.log('-------------------pointfree------------------------');

{
    let R       = require('ramda'),
        curry   = R.curry;

    // map :: Monad m => (a -> b) -> m a -> m b
    let map = curry(function(fn, m) {
        return m.map(fn);
    });

    // chain :: Monad m => (a -> m b) -> m a -> m b
    let chain = curry(function(fn, m) {
        return m.chain(fn);
    });

    // ap :: Monad m => m (a -> b) -> m a -> m b
    let ap = curry(function(mf, m) { // mf, not fn, because this is a wrapped function
        return mf.ap(m);
    });

    // orElse :: Monad m => m a -> a -> m a
    let orElse = curry(function(val, m) {
        return m.orElse(val);
    });

    let Maybe = function(val) {
        this.__value = val;
    };

    Maybe.of = function(val) {
        return new Maybe(val);
    };

    Maybe.prototype.isNothing = function() {
        return (this.__value === null || this.__value === undefined);
    };

    Maybe.prototype.map = function(f) {
        if (this.isNothing()) {
            return Maybe.of(null);
        }
        return Maybe.of(f(this.__value));
    };

    // разворачивает монаду
    Maybe.prototype.join = function() {
        return this.__value;
    };

    // map + join, чтобы не зарываться внутрь на ещё одну монаду
    Maybe.prototype.chain = function(f) {
        return this.map(f).join();
    };

    // значение по умолчанию
    Maybe.prototype.orElse = function(def) {
        if (this.isNothing()) {
            return Maybe.of(def);
        }

        return this;
    };

    //  method that applies the wrapped function to our Maybe with a value
    Maybe.prototype.ap = function(someOtherMaybe) {
        return someOtherMaybe.map(this.__value);
    }

    let liftA2 = curry(function(fn, m1, m2) {
        return m1.map(fn).ap(m2);
    });

    let pipe        = R.pipe;
    let bannerEl    = Maybe.of({src:''});
    let applyBanner = curry(function(el, banner) {
        el.src = banner;
        return el;
    });

    // customiseBanner :: Monad m => String -> m DOMElement
    let customiseBanner = pipe(
        Maybe.of,
        map(R.path(['accountDetails', 'address', 'province'])),
        liftA2(applyBanner, bannerEl)
    );

    // ахтунг. что-то пошло не так. в src попал код провинции
    console.log(customiseBanner(user));
}