document.addEventListener("DOMContentLoaded", async function () {
  const STORAGE_KEY = "tracked-applications";
  const appTrackerContainer = document.getElementById("apptracker-container");
  const API_BASE_URL = ENV.API_BASE_URL
  // Function to load jobs from local storage and display them
  const loadJobsFromLocalStorage = async () => {
    try {
      const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
      const jobApps = retrievedStorage[STORAGE_KEY] || []; // Get job applications or default to an empty array
      console.log("Job applications fetched from local storage:", jobApps);

      // Display jobs in the UI
      displayJobApplications(jobApps);

      // Update badge counter
      updateBadgeCounter(jobApps);
    } catch (error) {
      console.error("Error fetching jobs from local storage:", error);
    }
  };

  // Function to update the badge counter based on the number of job applications
  const updateBadgeCounter = (jobApplications) => {
    const jobCount = jobApplications?.length || 0;

    console.log("Job count in local storage:", jobCount);

    // Update the badge counter
    chrome.action.setBadgeText({ text: jobCount > 0 ? String(jobCount) : "" });
  };

  // Function to display job applications in the UI
  // First clears UI, then adds data row elements using data pulled from local storage.
  const displayJobApplications = async (jobApps) => {
    console.log("jobApps", jobApps);
    const tableBody = document.querySelector(".apptracker__table-body-row");
    while (tableBody.firstChild) {
      tableBody.firstChild.remove();
    }

    jobApps?.forEach((jobApp, index) => {
      const tableRow = document.createElement("tr");

      // Assign a unique ID to the row for scrolling purposes
      const jobId = `job-${index}`;
      tableRow.id = jobId;


      const tableDataCompanyName = document.createElement("td");
      const tableDataJobTitle = document.createElement("td");
      const tableDataLocation = document.createElement("td");

      // Create a new `td` for the buttons and wrap them in a div
      const tableDataButtonColumn = document.createElement("td");
      const buttonContainer = document.createElement("div"); // New div to wrap both buttons
      buttonContainer.classList.add("button-container"); // Optional: add a class for styling

      const tableDataDeleteButton = document.createElement("button");
      const tableDataGenerateButton = document.createElement("button");

      tableDataDeleteButton.textContent = "Delete";
      tableDataGenerateButton.textContent = " Build Resume";

      tableDataGenerateButton.classList.add("btn-generate");
      tableDataDeleteButton.classList.add("btn-delete");

      tableDataDeleteButton.dataset.jobId = jobApp._id;
      tableDataDeleteButton.addEventListener("click", (event) => handleDeletingJob(event, index));


      // Set text content for the other table cells
      tableDataCompanyName.textContent = jobApp.companyName;
      tableDataJobTitle.textContent = jobApp.jobTitle;
      tableDataLocation.textContent = jobApp.location;

      // Append the buttons to the button container div
      buttonContainer.appendChild(tableDataDeleteButton);
      buttonContainer.appendChild(tableDataGenerateButton);

      // Append the button container div to the table data cell
      tableDataButtonColumn.appendChild(buttonContainer);

      // Append all cells to the table row
      tableRow.appendChild(tableDataCompanyName);
      tableRow.appendChild(tableDataJobTitle);
      tableRow.appendChild(tableDataLocation);
      tableRow.appendChild(tableDataButtonColumn);
      tableBody.appendChild(tableRow);
      // console.log(API_BASE_URL)

      // Scroll to the recently added job (last job in the list)
      if (index === jobApps.length - 1) {
        setTimeout(() => {
          tableRow.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100); // Add a slight delay to ensure the DOM is updated
      }

      // Add event listener to the generate button
      // Inside displayJobApplications, update the generate button event listener
      tableDataGenerateButton.addEventListener("click", () => {
        const dashboardURL = `${API_BASE_URL}/extension`;
        console.log("dashboardURL", dashboardURL)
        chrome.tabs.create({ url: dashboardURL }, (tab) => {
          if (!tab || !tab.id) {
            console.error("Tab creation failed or tab ID is not available.");
            return;
          }

          const jobAppData = {
            action: "SEND_JOB_DATA",
            data: {
              companyName: jobApp.companyName,
              jobTitle: jobApp.jobTitle,
              location: jobApp.location,
              description: jobApp.description,
              applyMethod: jobApp.applyMethod,
              applicationDate: jobApp.applicationDate,
            }
          };

          console.log("Sending job data to website:", jobAppData);

          // Store in localStorage.eData before sending
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (data) => {
              localStorage.setItem("eData", JSON.stringify([data.data])); // Store as array
              window.postMessage(data, "*");
            },
            args: [jobAppData],
          }, () => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError.message);
            } else {
              console.log("Job data stored in localStorage.eData and sent via postMessage");
            }
          });
        });
      });

    });
  };

  // Function to handle adding a job
  const addJobToLocalStorage = async (jobData) => {
    try {
      const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
      const jobApps = retrievedStorage[STORAGE_KEY] || [];

      // Check if the job already exists (based on URL)
      const isDuplicate = jobApps.some((job) => job.jobUrl === jobData.jobUrl);
      if (isDuplicate) {
        alert("This job is already added!");
        return;
      }

      // Add the new job
      jobApps.push(jobData);

      // Save back to local storage
      await chrome.storage.local.set({ [STORAGE_KEY]: jobApps });
      console.log("Job added to local storage:", jobData);

      // Reload the UI
      loadJobsFromLocalStorage();
    } catch (error) {
      console.error("Error adding job to local storage:", error);
    }
  };

  // Function to delete a job from local storage
  const handleDeletingJob = async (event, jobIndexToDelete) => { // Accept index as argument
    try {
      const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
      const jobApps = retrievedStorage[STORAGE_KEY] || [];

      if (jobIndexToDelete >= 0 && jobIndexToDelete < jobApps.length) { // Check bounds
        jobApps.splice(jobIndexToDelete, 1);

        await chrome.storage.local.set({ [STORAGE_KEY]: jobApps });
        console.log("Job deleted successfully");

        loadJobsFromLocalStorage();
      } else {
        console.log("Invalid job index for deletion:", jobIndexToDelete);
      }

    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };


  // Function to scrape job data from the active tab
  const scrapeJobDataFromTab = async (tabId) => {
    return new Promise((resolve, reject) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          func: () => {
            const getElementText = (selector) =>
              document.querySelector(selector)?.textContent?.trim() || "Unknown";

            const applicationDateFormatted = () => {
              const date = new Date();
              return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            };

            return {
              companyName: document.querySelector('.jobsearch-JobInfoHeader-companyNameSimple')?.textContent.trim() ||
                document.querySelector('.jobsearch-JobInfoHeader-companyNameLink')?.textContent.trim() ||
                document.querySelector('[data-company-name="true"] a')?.textContent.trim() ||
                "Company name not found",


              jobTitle: document.querySelector('h2[data-testid="simpler-jobTitle"]')?.textContent.trim() ||
                document.querySelector('h2[data-testid="jobsearch-JobInfoHeader-title"]')?.textContent.trim() ||
                "Job title not found",
              location: getElementText('div[data-testid="jobsearch-JobInfoHeader-companyLocation"]'),
              jobUrl: window.location.href,
              description: document.querySelector("#jobDescriptionText")?.innerHTML.trim() || "No description",
              applicationDate: applicationDateFormatted(),
              applyMethod: "Indeed Apply",
            };
          },
        },
        (results) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else if (results[0]?.result) {
            resolve(results[0].result);
          } else {
            reject("Failed to scrape job data");
          }
        }
      );
    });
  };

  // Function to handle the "Add Current Job" button click
  const handleAddCurrentJob = async () => {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentTab = tabs[0];

      if (currentTab && currentTab.url.includes("indeed.com")) {
        const jobData = await scrapeJobDataFromTab(currentTab.id);
        await addJobToLocalStorage(jobData);
      } else {
        alert("Please navigate to a job on Indeed.com to add it!");
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Attach event listener to the "Add Current Job" button
  document
    .querySelector("#apptracker__add-current-selected-job-button")
    .addEventListener("click", handleAddCurrentJob);

  // Initial load
  loadJobsFromLocalStorage();
});
