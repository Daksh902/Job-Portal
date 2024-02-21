const jobModel = require('../models/job');

// Job Listings Page
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getAllJobs();
    const currentUser = req.session.user || null;

    res.render('jobListings', { jobs, currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Job Details Page
exports.getJobDetails = async (req, res) => {
  const jobId = req.params.id;
  const job = await jobModel.getJobById(jobId);

  if (job) {
    res.render('jobDetails', { job });
  } else {
    res.status(404).render('error404');
  }
};

// Applicant List Page
exports.getApplicants = async (req, res) => {
  const jobId = req.params.id;
  const applicants = await jobModel.getApplicants(jobId);
  res.render('applicantList', { applicants });
};

// New Job Page
exports.getNewJob = (req, res) => {
  res.render('newJob');
};

exports.postNewJob = async (req, res) => {
  const jobData = req.body;
  const newJob = await jobModel.createJob(jobData);

  if (newJob) {
    res.redirect('/jobs');
  } else {
    res.render('newJob', { error: 'Job creation failed' });
  }
};

// Update Job Page
exports.getUpdateJob = async (req, res) => {
  const jobId = req.params.id;
  const job = await jobModel.getJobById(jobId);

  if (job) {
    res.render('updateJob', { job });
  } else {
    res.status(404).render('error404');
  }
};

exports.postUpdateJob = async (req, res) => {
  const jobId = req.params.id;
  const updatedJobData = req.body;
  const updatedJob = await jobModel.updateJob(jobId, updatedJobData);

  if (updatedJob) {
    res.redirect(`/jobs/${jobId}`);
  } else {
    res.render('updateJob', { error: 'Job update failed' });
  }
};

// Delete Job Page
exports.getDeleteJob = async (req, res) => {
  const jobId = req.params.id;
  const deletedJob = await jobModel.deleteJob(jobId);

  if (deletedJob) {
    res.redirect('/jobs');
  } else {
    res.status(404).render('error404');
  }
};

// Apply to Job Page
exports.postApplyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicantData = req.body;
    const resume = req.file.buffer; // Assuming multer middleware is used for file upload
    const applicationResult = await jobModel.applyToJob(jobId, applicantData, resume);

    if (applicationResult) {
      res.redirect(`/jobs/${jobId}`);
    } else {
      res.status(404).render('error404');
    }
  } catch (error) {
    console.error('Error in postApplyJob:', error);
    res.status(500).send('Internal Server Error');
  }
};
