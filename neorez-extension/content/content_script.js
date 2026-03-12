document.addEventListener("DOMContentLoaded", async function () {
    const STORAGE_KEY = "tracked-applications";
    const AUTH_KEY = "isAuthenticated"; // Store authentication state
    const USER_DATA_KEY = "userData"; // Key to store the entire API response

    // Use the environment variable from env.js 
    const API_JOB_APPLICATION_URL = ENV.API_JOB_APPLICATION_URL;
    const API_BASE_URL = ENV.API_BASE_URL // Your job application API endpoint 
    const appTrackerContainer = document.getElementById("apptracker-container");
    // Function to fetch and display job applications from backend API
    const loadStorageFromAPI = async () => {
        try {

            // Call the backend API to fetch the job applications
            const response = await fetch(
                `${API_JOB_APPLICATION_URL}/get-jobs/${userData.data._id}`,
                {
                    method: "GET",
                    headers: {
                        // Authorization: `Bearer ${token}`, // Send token for authentication
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch job applications: ${response.statusText}`
                );
            }

            const jobApplications = await response.json(); // Array of job applications
            console.log("Job applications fetched from API:", jobApplications);

            // Display job applications in the UI
            displayJobApplications(jobApplications);
            updateBadgeCounter(jobApplications);
        } catch (error) {
            console.error("Error fetching job applications:", error);
        }
    };

    // Function to update the badge counter based on the number of job applications
    const updateBadgeCounter = async (jobApplications) => {

        const jobCount = jobApplications?.length;

        console.log("Job count in storage:", jobCount);

        // Update the badge counter
        chrome.action.setBadgeText({ text: jobCount > 0 ? String(jobCount) : '' });
    };

    // Function to show app tracker
    function showAppTracker() {
        // loginContainer.style.display = "none";
        appTrackerContainer.style.display = "flex";
        loadStorageFromAPI();
        updateBadgeCounter();
        // loadStorage();  // Load the job tracker data if authenticated

        // Display user data (optional)
        // const userData = localStorage.getItem(USER_DATA_KEY);
        // if (userData) {
        //   const user = JSON.parse(userData);
        //   console.log("User Data:", user); // You can use this data as per your requirement
        // }
    }
    showAppTracker()



    const handleDeletingJobButton = async (event) => {
        const jobId = event.target.dataset.jobId; // Get the job ID from dataset

        // Confirm the deletion
        const confirmDelete = confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            // const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
            // const token = userData?.token;

            // if (!token) {
            //   throw new Error("User is not authenticated");
            // }

            // Call backend API to delete the job
            const response = await fetch(
                `${API_JOB_APPLICATION_URL}/delete-job/${jobId}`,
                {
                    method: "DELETE",
                    headers: {
                        // Authorization: `Bearer ${token}`, // Send token for authentication
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to delete job application: ${response.statusText}`
                );
            }

            console.log("Job application deleted successfully");

            //Delete the job from chrome.storage.local
            const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
            const jobApps = retrievedStorage[STORAGE_KEY] || [];

            // Filter out the deleted job from storage
            const updatedJobApps = jobApps.filter((job) => job._id !== jobId);

            // Save updated job list back to chrome.storage.local
            await chrome.storage.local.set({ [STORAGE_KEY]: updatedJobApps });

            // Reload storage to update the UI
            loadStorageFromAPI(); // Reload job data from API

            // Update badge counter
            updateBadgeCounter();
        } catch (error) {
            console.error("Error deleting job application:", error);
        }
    };



    // First clears UI, then adds data row elements using data pulled from local storage.
    const displayJobApplications = async (jobApps) => {
        console.log("jobApps", jobApps);
        const tableBody = document.querySelector(".apptracker__table-body-row");
        while (tableBody.firstChild) {
            tableBody.firstChild.remove();
        }

        jobApps?.forEach((jobApp, idx) => {
            const tableRow = document.createElement("tr");

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
            tableDataDeleteButton.addEventListener("click", handleDeletingJobButton);

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
            console.log(API_BASE_URL)

            // Add event listener to the generate button
            tableDataGenerateButton.addEventListener("click", () => {
                const dashboardURL = `${API_BASE_URL}/extension`;

                // Open the URL
                chrome.tabs.create({ url: dashboardURL }, (tab) => {
                    if (!tab || !tab.id) {
                        console.error("Tab creation failed or tab ID is not available.");
                        return;
                    }

                    // Prepare the job data to send
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

                    console.log("Sending job data to website via postMessage:", jobAppData);

                    // Send job data to the new tab using postMessage
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: (data) => {
                            // Send the data to the window of the new tab
                            window.postMessage(data, "*"); // "*" is the target origin for all origins, but you can restrict it if needed.
                        },
                        args: [jobAppData],
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.error("Error sending message to tab:", chrome.runtime.lastError.message);
                        }
                    });
                });
            });
        });
    };

    // Function to call your backend API to save job applications
    const saveJobApplicationToDatabase = async (jobData) => {
        try {

            const response = await fetch(`${API_JOB_APPLICATION_URL}/add-jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`, // Send token for authentication
                },
                body: JSON.stringify(jobData),
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to save job application: ${response.statusText}`
                );
            }

            const result = await response.json();
            console.log("Job application saved to database:", result);

            // Reload storage to update the UI
            loadStorageFromAPI();

            // Update badge counter
            updateBadgeCounter();
        } catch (error) {
            console.error("Error saving job application to database:", error);
        }
    };

    // Handles when all items are cleared
    const clearAllItems = async () => {
        await chrome.storage.local.clear();
        loadStorageFromAPI();
        // loadStorage(); // Refresh UI after clearing
    };


    // Inject the job scraping logic directly into the active Indeed tab
    const scrapeIndeedJobDataInTab = async (tabId) => {
        return new Promise((resolve, reject) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabId },
                    func: () => {
                        // Here we include the content script logic inside this function, which will be executed in the tab
                        const getJobDetailsElement = () => {
                            const jobSearchElement = document.querySelector(
                                ".jobsearch-JobComponent, .fastviewjob"
                            );
                            if (jobSearchElement) {
                                return jobSearchElement;
                            } else {
                                console.error("Job details element not found on this page.");
                                return null;
                            }
                        };

                        const applicationDateFormatted = () => {
                            const date = new Date();
                            return `${date.getMonth() + 1
                                }/${date.getDate()}/${date.getFullYear()}`;
                        };

                        // Inside scrapeIndeedJobDataInTab
                        const scrapeIndeedJobData = () => {
                            const jobDetailsWindow = getJobDetailsElement();
                            if (!jobDetailsWindow) {
                                console.error("No job details found.");
                                return null;
                            }

                            const jobTitle = document.querySelector('h1.jobsearch-JobInfoHeader-title')?.textContent.trim() || "Unknown Title";
                            const companyName = document.querySelector('div.jobsearch-InlineCompanyRating div[data-testid="inlineHeader-companyName"]')?.textContent.trim() || "Unknown Company";
                            const location = document.querySelector('div.jobsearch-JobInfoHeader-subtitle')?.textContent.trim() || "Unknown Location";
                            const description = document.querySelector('#jobDescriptionText')?.innerHTML.trim() || "No description";
                            const jobUrl = window.location.href;

                            const jobData = {
                                companyName,
                                jobTitle,
                                location,
                                jobUrl,
                                description,
                                applicationDate: applicationDateFormatted(),
                                applyMethod: "Indeed Apply",
                            };

                            return jobData;
                        };
                        // Execute job scraping logic and return the data
                        const jobData = scrapeIndeedJobData();
                        return jobData ? { jobData } : { error: "No job data found." };
                    },
                },
                (injectionResults) => {
                    if (chrome.runtime.lastError) {
                        reject(
                            new Error(
                                `Script injection failed: ${chrome.runtime.lastError.message}`
                            )
                        );
                    } else if (
                        injectionResults[0] &&
                        injectionResults[0].result &&
                        injectionResults[0].result.jobData
                    ) {
                        resolve(injectionResults[0].result.jobData);
                    } else {
                        reject(new Error("Failed to retrieve job data."));
                    }
                }
            );
        });
    };

    // Handle manually adding an item via button click
    const handleAddCurrentSelectedJob = async () => {
        try {
            const tabs = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            if (tabs.length === 0) {
                console.error("No active tab found at all.");
                return;
            }

            const indeedTab = tabs.find(
                (tab) => tab.url && tab.url.includes("indeed.com")
            );
            if (indeedTab) {
                console.log("Active Indeed tab selected:", indeedTab);

                // Scrape job data directly in the tab
                const jobData = await scrapeIndeedJobDataInTab(indeedTab.id);
                if (jobData) {
                    console.log("Job data scraped:", jobData);

                    // Get user data
                    // const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
                    // if (!userData || !userData.data._id) {
                    //   console.error("User ID not found in local storage.");
                    //   return;
                    // }

                    // Add the userId to the job data object
                    // jobData.userId = userData.data._id;

                    // Check if the job URL already exists in local storage
                    const existingJobApps = await chrome.storage.local.get(STORAGE_KEY);
                    const jobApps = existingJobApps[STORAGE_KEY] || [];

                    const isDuplicateUrl = jobApps.some(
                        (job) => job.jobUrl === jobData.jobUrl
                    );

                    if (isDuplicateUrl) {
                        alert(
                            "This job has already been added. Please select a different job."
                        );
                        return; // Exit if duplicate
                    }

                    // Store the job data in local storage
                    storeJobData(jobData);

                    // Store the job data in the database
                    await saveJobApplicationToDatabase(jobData);

                    // Reload storage to update the UI
                    loadStorageFromAPI();
                    // loadStorage();
                } else {
                    console.error("Failed to scrape job data.");
                }
            } else {
                console.error("No active Indeed tab found.");
            }
        } catch (error) {
            console.error("Error querying active tab:", error);
        }
    };

    document
        .querySelector("#apptracker__add-current-selected-job-button")
        .addEventListener("click", handleAddCurrentSelectedJob);

    // Function to store job data in local storage
    const storeJobData = async (jobData) => {
        const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
        const jobApps = retrievedStorage[STORAGE_KEY] || [];

        // Add the new job data
        jobApps.push(jobData);

        // Save the updated list in storage
        await chrome.storage.local.set({ [STORAGE_KEY]: jobApps });

        console.log("Job data stored:", jobApps);
        loadStorageFromAPI();
        // loadStorage(); // Refresh UI after adding job data

        // Update badge counter
        updateBadgeCounter();
    };

    // Handle copying all job applications to clipboard
    const handleCopyToClipboard = async () => {
        const retrievedStorage = await chrome.storage.local.get(STORAGE_KEY);
        const jobApps = retrievedStorage[STORAGE_KEY];

        let clipboardContents = "";

        jobApps?.forEach((jobApp) => {
            const jobAppAsCsv = `"${jobApp.companyName.replace(",", ".")}","${jobApp.jobTitle
                }","${jobApp.jobUrl}","${jobApp.applyMethod}",${jobApp.applicationDate
                }\n`;
            clipboardContents += jobAppAsCsv;
        });

        // Write to clipboard
        await navigator.clipboard.writeText(clipboardContents);
    };

    // document.querySelector("#apptracker__copy-to-clipboard-button").addEventListener("click", handleCopyToClipboard);
});