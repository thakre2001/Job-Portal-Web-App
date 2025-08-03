import React, { useState } from 'react'

const JobPage = () => {

    // const [jobExperience, setJobExperience] = useState("Select expereince")

    const [jobs] = useState([
        {
            id: 1,
            title: 'React Developer',
            company: 'TechNova',
            location: 'Remote',
            salary: '$80k/year',
            description: 'Work on front-end development with React and Redux.',
        },
        {
            id: 2,
            title: 'Java Backend Developer',
            company: 'CodeCrafters',
            location: 'Bangalore',
            salary: '₹12 LPA',
            description: 'Develop REST APIs using Spring Boot and Microservices.',
        },
    ])
    return (
        <>

            {/* <div className='jobpage bg-light' style={{ paddingTop: 150 }}>
                <section className='container-fluid banner-section'>
                    <h1>Find your dream job</h1>

                    <div className="search-bar">
                        <i className='fa fa-search me-3'></i>
                        <input
                            type="text"
                            name="skill"
                            id=""
                            placeholder='Enter skills / designations / companies'
                        />
                        <span> | </span>
                        <select name="experience" value={jobExperience} id="" className='p-0 m-0 w-25'>
                            <option selected disabled>Select experience</option>
                            <option value="Fresher">Fresher <span>(less than 1 year)</span></option>
                            <option value="1">1 year</option>
                            <option value="2">2 year</option>
                            <option value="3">3 year</option>
                            <option value="4">4 year</option>
                            <option value="5">5 year</option>
                        </select>
                        <span> | </span>
                        <input
                            type="text"
                            name="location"
                            id=""
                            placeholder='Enter location'
                            className='w-25 me-0'
                        />
                        <button className='bg-primary ms-0 rounded-pill px-5 py-3'>Search</button>
                    </div>
                </section>

                <section>
                    <div className="row mt-3">
                        <div className="col-md-8">
                            <div className="card my-3 mx-3 p-5">
                                <div className="card-body">
                                    <div>
                                        <h3>Title</h3>
                                        <h5>Description, Rating</h5>
                                    </div>
                                    <p>location</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card my-3 mx-3 p-5">
                                <div className="card-body">
                                    <div>
                                        <h3>Title</h3>
                                        <h5>Description, Rating</h5>
                                    </div>
                                    <p>location</p>
                                    <p>Description</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card my-3 mx-3 p-5">
                                <div className="card-body">
                                    <div>
                                        <h3>Title</h3>
                                        <h5>Description, Rating</h5>
                                    </div>
                                    <p>location</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card my-3 mx-3 p-5">
                                <div className="card-body">
                                    <div>
                                        <h3>Title</h3>
                                        <h5>Description, Rating</h5>
                                    </div>
                                    <p>location</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div> */}
            {/* <div className="p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Job Seeker Panel</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
                        <ul className="space-y-4">
                            <li className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                                <p className="font-medium">React Developer</p>
                                <span className="text-sm text-gray-500">Remote | $70k/year</span>
                            </li>
                            <li className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
                                <p className="font-medium">Spring Boot Developer</p>
                                <span className="text-sm text-gray-500">Bangalore | ₹8 LPA</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Your Applications</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center border p-3 rounded">
                                <div>
                                    <p className="font-medium">Java Developer</p>
                                    <span className="text-sm text-yellow-600">Status: Interview Scheduled</span>
                                </div>
                                <button className="text-blue-600 font-medium">View</button>
                            </li>
                            <li className="flex justify-between items-center border p-3 rounded">
                                <div>
                                    <p className="font-medium">Frontend Developer</p>
                                    <span className="text-sm text-gray-600">Status: Pending</span>
                                </div>
                                <button className="text-blue-600 font-medium">View</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}

            <div className="container jobpage-container" style={{ paddingTop: 100 }}>
                <h2 className='text-center mb-4'>Explore Jobs</h2>

                <div className="row">
                    {
                        jobs.map((job) => (
                            <div className="col-md-6 mb-4" key={job.id}>
                                <div className="card h-100 shadow-sw p-4">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h5 className='mb-1'>{job?.title}</h5>
                                            <p className='text-muted'>{job?.company}</p>
                                            <p className='text-secondary'>{job?.location}</p>
                                            <p className='text-success fw-semibold'>{job?.salary}</p>
                                            <p className='small text-muted'>{job?.description.slice(0, 100)}...</p>
                                            <p></p>
                                        </div>
                                    </div>

                                    <div className='mt-3 d-flex gap-2 justify-content-end'>
                                        <button className='btn py-2 px-4 fs-5 btn-sm btn-outline-info'>
                                            View Details
                                        </button>
                                        <button className='btn py-2 px-4 fs-5 btn-sm btn-primary'>
                                            Apply
                                        </button>
                                        <button className='btn py-2 px-4 fs-5 btn-sm btn-outline-secondary'>
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default JobPage
