function SAVE_INFO()
{
    chrome.runtime.onMessage.addListener(function (response, sendResponse) {
        if(response === "save")
        {
            if(document.querySelector('[aria-labelledby="social-details-reactors-modal__header"]') !== null)
            {
                var board = document.querySelector('[aria-labelledby="social-details-reactors-modal__header"]')

                var fullNames = board.querySelectorAll('[dir="ltr"]');
                var links = board.querySelectorAll('[rel="noopener noreferrer"]');
                var info = board.querySelectorAll(".artdeco-entity-lockup__caption");
                var list = [];

                for(let i = 0; i < fullNames.length; i++)
                {
                    list.push([fullNames[i].innerText, links[i].href, info[i].innerText]);
                }

                function saveInfoCSV(arr)
                {
                    const a = document.createElement("a");
                    const content = new Blob([JSON.stringify(arr, null, ' ')], {type: "application/json"});
                    a.href = URL.createObjectURL(content)
                    a.download = "data.csv";
                    a.click();
                    URL.revokeObjectURL(a.href)
                }

                function saveInfoHTML(fullNames, links, info) {
                  var content = [];
                  for(let i = 0; i < fullNames.length; i++)
                  {
                    text = `${i+1}: NAME: ${fullNames[i].innerText}; LINK: ${links[i].href}; BIO: ${info[i].innerText}\n\n`
                    content.push(text)
                  }
                  var blob = new Blob(content, {type: "text/html;charset=utf-8"});
                  var a = document.createElement("a");
                  a.href = URL.createObjectURL(blob);
                  a.download = "data.html";
                  a.click();
                  URL.revokeObjectURL(a.href)
                }

                saveInfoCSV(list); saveInfoHTML(fullNames, links, info);
            }
        }
    });
}

SAVE_INFO();
