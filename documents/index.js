module.exports = ({ imgUrl = "default" }) => {
	const today = Date.now();

	return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>PDF Result Template</title>
                <style>

                    body, html {
                        height: 100%;
                        position: relative;
                        background-color: red;
                        margin: 0;
                        padding: 0;
                        background-image: url(https://s.iha.com/00122118376/Kenya-Kilimanjaro-landscape.jpeg);
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                    }

                    .header {
                        font-size: 30px;
                        color: lightblue;
                        background: darkgoldenrod;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }

                   
                </style>
            </head>
            
            <body>
                <h1 class="header">Testing this PDF url: ${imgUrl}</h1>
            </body>
        </html>
    `;
};
