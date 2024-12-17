const global = {
    currentPage: window.location.pathname
    };

    switch (global.currentPage) {
        case "/":
        case "/index.html":
            console.log("Home");
            break;   
        case "/shows.html":
            console.log("Shows");
            break;   
    }
//    console.log(window.location.pathname)