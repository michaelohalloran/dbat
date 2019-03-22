module.exports = ({ imgUrl = "default" }) => {
	const today = Date.now();

	return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>PDF Result Template</title>
                <style>
                    .header {
                        font-size: 30px;
                        color: lightblue;
                        background: darkgoldenrod;
                    }

                    img {
                        width: 200px;
                        height: 200px;
                    }
                </style>
            </head>
            
            <body>

                <h1 class="header">Testing this PDF url: ${imgUrl}</h1>
                <h5>Today is ${today}</h5>

                <img src='https://s.iha.com/00122118376/Kenya-Kilimanjaro-landscape.jpeg' />

            </body>
        </html>
    `;
};
