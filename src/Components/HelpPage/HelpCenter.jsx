import React from 'react';

const HelpCenter = () => {
  return (
    <div className="container" style={{paddingTop:100}}>
      <h2 className="mb-4">Help Center</h2>
      <p className="mb-4">Browse the most common questions our users ask. If you still need help, contact support through the form on our <strong>Contact Us</strong> page.</p>

      <div className="accordion" id="faqAccordion">
        {/* FAQ 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
              How do I apply for a job?
            </button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Login to your account, browse job listings, and click the "Apply Now" button to submit your application.
            </div>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
              How do I edit my profile?
            </button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Visit your Profile page and click "Edit Profile" to update your personal details, resume, and photo.
            </div>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
              Can I upload my resume in Word format?
            </button>
          </h2>
          <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Yes. We support PDF, DOC, and DOCX formats. However, for best compatibility, we recommend uploading in PDF.
            </div>
          </div>
        </div>

        {/* FAQ 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
              Why isn't my profile photo uploading on mobile?
            </button>
          </h2>
          <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Ensure camera or gallery access is granted to your browser. Refresh and try again or use a different mobile browser.
            </div>
          </div>
        </div>

        {/* FAQ 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
              I'm an employer. How can I post a job?
            </button>
          </h2>
          <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Login with your recruiter account and go to the “Post a Job” section to fill in job details and publish your listing.
            </div>
          </div>
        </div>

        {/* FAQ 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
              Can I track the jobs I’ve applied to?
            </button>
          </h2>
          <div id="faq6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Yes, go to your “Applications” section in your dashboard to view and track your submitted job applications.
            </div>
          </div>
        </div>

        {/* FAQ 7 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7">
              I forgot my password. What should I do?
            </button>
          </h2>
          <div id="faq7" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Click “Forgot Password” on the login page. Follow the instructions sent to your email to reset it.
            </div>
          </div>
        </div>

        {/* FAQ 8 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq8">
              How do I delete my account?
            </button>
          </h2>
          <div id="faq8" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              Go to your account settings and click “Delete Account.” Note that this action is permanent and cannot be undone.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
