import React, {useEffect} from 'react';
import pdfjs from "pdfjs-dist"
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import helloWorldPDF from "./helloworld.pdf";

function App() {

    //Needs debug, console has a Warning: Setting up fake worker.
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    useEffect(() => {
        const loadingTask = pdfjs.getDocument(helloWorldPDF);

        loadingTask.promise.then((doc) => {

            console.log("pdf loaded");

            const pageNumber = 1;
            doc.getPage(pageNumber).then((page) => {
                    console.log("page loaded");
                    const scale = 1.5;
                    const viewport = page.getViewport({scale: scale});

                    const canvas = document.getElementById("the-canvas");
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Render PDF page into canvas context
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    const renderTask = page.render(renderContext);
                    renderTask.promise.then(function () {
                        console.log('Page rendered');
                    });
                }
            );
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
            <h1>PDF.js 'Hello, world!' example</h1>
            <canvas style={{
                border: "1px solid black",
                direction: "ltr"
            }} id="the-canvas"/>
        </div>
    );
}

export default App;
