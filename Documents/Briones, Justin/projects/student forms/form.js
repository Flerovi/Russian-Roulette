document.addEventListener('DOMContentLoaded', function() {
    const studentList = document.getElementById('studentList');
    const refresh = document.getElementById('refresh');
    const submit = document.getElementById('submit');
    const test = JSON.parse(localStorage.getItem("test2")) || [];

    const renderInfo = (students) => {
        if (!studentList) return; // Safeguard
        const info = students.map((data) => {
            const { firstName, middleName, lastName, age, gender, email, phoneNumber, address, date, course, school } = data;
            return `
                <li class="studentCard">
                    <div class="name2">${firstName || ''} ${middleName || ''} ${lastName || ''}</div>
                    <div class="cardContent">
                        <div class="cardHalf">
                            <div class="cardInfo">About</div>
                            <div class="cardSubContent">
                                <div class="Row">
                                    <div class="cardContentKey">Age:</div>
                                    <div class="cardContentInfo">${age || ''}</div>
                                </div>
                                <div class="Row2">
                                    <div class="cardContentKey">Sex:</div>
                                    <div class="cardContentInfo">${gender || ''}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cardHalf">
                            <div class="cardInfo">Contact</div>
                            <div class="cardSubContent">
                                <div class="Row">
                                    <div class="cardContentKey">Email:</div>
                                    <div class="cardContentInfo">${email || ''}</div>
                                </div>
                                <div class="Row2">   
                                    <div class="cardContentKey">PhoneNumber:</div>
                                    <div class="cardContentInfo">${phoneNumber || ''}</div>
                                </div>
                                <div class="Row">
                                    <div class="cardContentKey">Address:</div>
                                    <div class="cardContentInfo">${address || ''}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="education">
                        <div class="experience">
                            <div>
                                <div class="experience-year">${date || ''}</div>
                                <div class="experience-course">${course || ''}</div>
                                <div class="">${school || ''}</div>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        }).join("");
        studentList.innerHTML = info;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let id = test.length > 0 ? test[test.length - 1].id + 1 : 1;
        let firstName = document.getElementById("studentFirstName").value;
        let middleName = document.getElementById('studentMiddleName').value;
        let lastName = document.getElementById('studentLastName').value;
        let age = document.getElementById('studentAge').value;
        let email = document.getElementById('studentEmail').value;
        let address = document.getElementById('studentAddress').value;
        let phoneNumber = document.getElementById('studentPhoneNumber').value;
        let date = document.getElementById('studentDate').value;
        let course = document.getElementById('studentCourse').value;
        let school = document.getElementById('studentSchool').value;
        let gender = document.querySelector('input[name="gender"]:checked')?.value || '';

        test.push({
            id,
            firstName,
            middleName,
            lastName,
            age,
            email,
            address,
            phoneNumber,
            date,
            course,
            school,
            gender
        });

        localStorage.setItem("test2", JSON.stringify(test));
        renderInfo(test);
        document.querySelector('form').reset(); // Clear form fields
    };

    if (submit) {
        submit.addEventListener('click', handleSubmit);
    }

    if (refresh) {
        refresh.addEventListener('click', (event) => {
            event.preventDefault();
            renderInfo(test);
        });
    }

    renderInfo(test); // Render any existing students on page load
});
