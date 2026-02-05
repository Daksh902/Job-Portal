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
  const currentUser = req.session.user || null;

  if (job) {
    res.render('jobDetails', { job, currentUser });
  } else {
    res.status(404).render('error404', { currentUser });
  }
};

// Applicant List Page
exports.getApplicants = async (req, res) => {
  const jobId = req.params.id;
  const applicants = await jobModel.getApplicants(jobId);
  const job = await jobModel.getJobById(jobId);
  const currentUser = req.session.user || null;
  res.render('applicantList', { applicants, job, currentUser });
};

// New Job Page
exports.getNewJob = (req, res) => {
  const currentUser = req.session.user || null;
  res.render('newJob', { currentUser });
};

exports.postNewJob = async (req, res) => {
  const jobData = req.body;
  const currentUser = req.session.user || null;

  // Process skills if present
  if (jobData.skills && typeof jobData.skills === 'string') {
    jobData.skillsrequired = jobData.skills.split(',').map(skill => skill.trim());
  } else {
    jobData.skillsrequired = [];
  }

  const newJob = await jobModel.createJob(jobData);

  if (newJob) {
    res.redirect('/jobs');
  } else {
    res.render('newJob', { error: 'Job creation failed', currentUser });
  }
};

// Update Job Page
exports.getUpdateJob = async (req, res) => {
  const jobId = req.params.id;
  const job = await jobModel.getJobById(jobId);
  const currentUser = req.session.user || null;

  if (job) {
    res.render('updateJob', { job, currentUser });
  } else {
    res.status(404).render('error404', { currentUser });
  }
};

exports.postUpdateJob = async (req, res) => {
  const jobId = req.params.id;
  const updatedJobData = req.body;
  const currentUser = req.session.user || null;

  if (updatedJobData.skills && typeof updatedJobData.skills === 'string') {
    updatedJobData.skillsrequired = updatedJobData.skills.split(',').map(skill => skill.trim());
  }

  const updatedJob = await jobModel.updateJob(jobId, updatedJobData);

  if (updatedJob) {
    res.redirect(`/jobs/${jobId}`);
  } else {
    res.render('updateJob', { error: 'Job update failed', job: updatedJobData, currentUser });
  }
};

// Delete Job Page
exports.getDeleteJob = async (req, res) => {
  const jobId = req.params.id;
  const deletedJob = await jobModel.deleteJob(jobId);
  const currentUser = req.session.user || null;

  if (deletedJob) {
    res.redirect('/jobs');
  } else {
    res.status(404).render('error404', { currentUser });
  }
};

// Apply to Job Page
exports.postApplyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicantData = req.body;
    const resume = req.file.buffer; // Assuming multer middleware is used for file upload
    const applicationResult = await jobModel.applyToJob(jobId, applicantData, resume);
    const currentUser = req.session.user || null;

    if (applicationResult) {
      res.redirect(`/jobs/${jobId}`);
    } else {
      res.status(404).render('error404', { currentUser });
    }
  } catch (error) {
    console.error('Error in postApplyJob:', error);
    res.status(500).send('Internal Server Error');
  }
};
