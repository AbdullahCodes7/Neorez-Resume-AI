const STORAGE_KEY = "tracked-applications";

   // Adds to local storage
   const pushToStorage = async (parsedData) => {
     const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
     const jobApps = Object.hasOwn(retrievedStorage, STORAGE_KEY) ? retrievedStorage[STORAGE_KEY] : [];
     jobApps.push(parsedData);
     await chrome.storage.local.set({ [STORAGE_KEY]: jobApps });
     console.log("Stored job data:", parsedData);
   };

   // Update badge text
   const updateBadgeText = async () => {
     const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
     const jobApps = retrievedStorage[STORAGE_KEY];
     const badgeText = jobApps?.constructor === Array ? jobApps.length.toString() : "0";
     await chrome.action.setBadgeText({ text: badgeText });
   };

   // Receive messages
   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if (request.jobTitle) {
       pushToStorage(request);
       sendResponse({ status: "Stored" });
     } else if (request.action === "getJobData") {
       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
         if (tabs[0]) {
           chrome.scripting.executeScript({
             target: { tabId: tabs[0].id },
             function: () => window.postMessage({ action: "SEND_JOB_DATA", data: window.jobData }, "*")
           });
         }
       });
       sendResponse({ status: "Requested" });
     } else if (request.externalApply) {
       chrome.tabs.query({ active: true, lastFocusedWindow: true })
         .then((result) => {
           if (result?.length > 0) {
             const url = new URL(result[0].pendingUrl).hostname;
             sendResponse(url);
           }
         })
         .catch((err) => console.error(err));
       return true;
     }
   });

   // Update badge on storage change
   chrome.storage.onChanged.addListener(updateBadgeText);

   // Initialize badge
   updateBadgeText();