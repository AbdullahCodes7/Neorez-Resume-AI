(function() {
     console.log("Content script loaded");
     function getJobData() {
       const jobTitle = document.querySelector('h1.jobsearch-JobInfoHeader-title')?.innerText || "Unknown Title";
       const companyName = document.querySelector('div.jobsearch-InlineCompanyRating div[data-testid="inlineHeader-companyName"]')?.innerText || "Unknown Company";
       const location = document.querySelector('div.jobsearch-JobInfoHeader-subtitle')?.innerText || "Unknown Location";
       const description = document.querySelector('div.jobsearch-jobDescriptionText')?.innerText || "No description";
       return {
         companyName: companyName.trim(),
         jobTitle: jobTitle.trim(),
         location: location.trim(),
         description: description.trim()
       };
     }

     function sendJobData() {
       const jobData = getJobData();
       if (jobData.companyName !== "Unknown Company" || jobData.jobTitle !== "Unknown Title") {
         console.log("Scraped job data:", jobData);
         chrome.runtime.sendMessage(jobData); // Send to service worker for storage
       }
     }

     if (document.readyState === "complete" || document.readyState === "interactive") {
       sendJobData();
     } else {
       document.addEventListener("DOMContentLoaded", sendJobData);
     }

     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
       if (message.action === "getJobData") {
         sendJobData();
         sendResponse({ status: "Data sent" });
       }
     });
   })();