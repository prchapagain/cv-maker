document.getElementById('add-education').addEventListener('click', function() {
    const educationSection = document.getElementById('education-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <label for="degree">Degree:</label>
        <input type="text" class="degree" placeholder="Enter degree" required>
        <label for="institution">Institution:</label>
        <input type="text" class="institution" placeholder="Enter institution name" required>
        <label for="year">Year:</label>
        <input type="text" class="year" placeholder="Enter graduation year" required>
    `;
    educationSection.appendChild(newEntry);
});

document.getElementById('add-language').addEventListener('click', function() {
    const languagesSection = document.getElementById('languages-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('language-entry');
    newEntry.innerHTML = `
        <label for="language">Language:</label>
        <input type="text" class="language" placeholder="Enter language" required>
        <label for="proficiency">Proficiency:</label>
        <input type="text" class="proficiency" placeholder="Enter proficiency level" required>
    `;
    languagesSection.appendChild(newEntry);
});

document.getElementById('add-work').addEventListener('click', function() {
    const workSection = document.getElementById('work-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('work-entry');
    newEntry.innerHTML = `
        <label for="company">Company:</label>
        <input type="text" class="company" placeholder="Enter company name" required>
        <label for="role">Role:</label>
        <input type="text" class="role" placeholder="Enter role" required>
        <label for="duration">Duration:</label>
        <input type="text" class="duration" placeholder="Enter duration" required>
    `;
    workSection.appendChild(newEntry);
});

document.getElementById('cv-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const sex = document.getElementById('sex').value;
    const nationality = document.getElementById('nationality').value;
    const citizenshipNo = document.getElementById('citizenship-no').value;
    const maritalStatus = document.getElementById('marital-status').value;
    const contactAddress = document.getElementById('contact-address').value;
    const objective = document.getElementById('objective').value;
    
    const photo = document.getElementById('photo').files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const photoUrl = e.target.result;

        const cvOutput = document.getElementById('cv-output');
        cvOutput.innerHTML = `
            <div class="cv-header">
                <h1 id="cv-title" class="cv-title">Curriculum Vitae</h1>
                <img src="${photoUrl}" alt="Photo" class="cv-photo">
                <h2>${name}</h2>
                <p>Address: ${address}</p>
                <p>Phone: ${phone}</p>
                <p>Email: ${email}</p>
            </div>
            <div class="cv-section">
                <h3>Objective</h3>
                <p>${objective}</p>
            </div>
            <div class="cv-section">
                <h3>Personal Details</h3>
                <div class="cv-details">
                    <p>Date of Birth: ${dob}</p>
                    <p>Sex: ${sex}</p>
                    <p>Nationality: ${nationality}</p>
                    <p>Citizenship No: ${citizenshipNo}</p>
                    <p>Marital Status: ${maritalStatus}</p>
                </div>
            </div>
            <div class="cv-section">
                <h3>Academic Qualification</h3>
                ${[...document.querySelectorAll('.education-entry')].map(entry => `
                    <div class="education-item">
                        <p>- ${entry.querySelector('.degree').value}</p>
                        <p>Institution: ${entry.querySelector('.institution').value}</p>
                        <p>Year: ${entry.querySelector('.year').value}</p>
                    </div>
                `).join('')}
            </div>
            <div class="cv-section">
                <h3>Languages Proficiency</h3>
                ${[...document.querySelectorAll('.language-entry')].map(entry => `
                    <div class="language-item">
                        <p>- ${entry.querySelector('.language').value}</p>
                    </div>
                `).join('')}
            </div>
            <div class="cv-section">
                <h3>Work Experience</h3>
                ${[...document.querySelectorAll('.work-entry')].map(entry => `
                    <div class="work-item">
                        <p>Company: ${entry.querySelector('.company').value}</p>
                        <p>Role: ${entry.querySelector('.role').value}</p>
                        <p>Duration: ${entry.querySelector('.duration').value}</p>
                    </div>
                `).join('')}
            </div>
        `;

        // Apply styles directly using JavaScript
        const cvTitle = document.getElementById('cv-title');
        cvTitle.style.fontWeight = 'bold';
        cvTitle.style.textAlign = 'center';
        cvTitle.style.textDecoration = 'underline';

        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (photo) {
        reader.readAsDataURL(photo);
    } else {
        reader.onload();
    }
});

document.getElementById('download-pdf').addEventListener('click', function() {
    const cvOutput = document.getElementById('cv-output');
    const opt = {
        margin:       0.5,
        filename:     'cv.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(cvOutput).save();
});

document.getElementById('download-image').addEventListener('click', function() {
    const cvOutput = document.getElementById('cv-output');
    html2canvas(cvOutput, { scrollY: -window.scrollY }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'cv.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
