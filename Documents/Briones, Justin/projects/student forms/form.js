document.addEventListener('DOMContentLoaded', function() {
    const studentList = document.getElementById('studentList');
    const test = JSON.parse(localStorage.getItem("test2")) || [];

    const fetchStudentData = async () => {
        try {
            const response = await fetch('form.json'); // Adjust the path as necessary
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const students = await response.json(); // Parse the JSON data
            renderInfo(students); // Render student info
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const renderInfo = (students)=> {
        const info = students.map((data) => {
            return `
                <li class="studentCard">
                    <div class="name2">${data.name.firstName} ${data.name.middleName} ${data.name.lastName}</div>
                    <div class="cardContent">
                        <div class="cardHalf">
                            <div class="cardInfo">About</div>
                            <div class="cardSubContent">
                                <div class="Row">
                                    <div class="cardContentKey">Age:</div>
                                    <div class="cardContentInfo">${data.age}</div>
                                </div>
                                <div class="Row2">
                                    <div class="cardContentKey">Sex:</div>
                                    <div class="cardContentInfo">${data.gender}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cardHalf">
                            <div class="cardInfo">Contact</div>
                            <div class="cardSubContent">
                                <div class="Row">
                                    <div class="cardContentKey">Email:</div>
                                    <div class="cardContentInfo">${data.email}</div>
                                </div>
                                <div class="Row2">   
                                    <div class="cardContentKey">PhoneNumber:</div>
                                    <div class="cardContentInfo">${data.phoneNumber}</div>
                                </div>
                                <div class="Row">
                                    <div class="cardContentKey">Address:</div>
                                    <div class="cardContentInfo">${data.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="education">
                        <div class="experience">
                            <div>
                                <div class="experience-year">${data.education.dateGraduated}</div>
                                <div class="experience-course">${data.education.course}</div>
                                <div class="">${data.education.school}</div>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        }).join("");

        studentList.innerHTML = info;
    };
    fetchStudentData();
    
/*    const submitButton= document.getElementById('submit');
        
    submitButton.addEventListener('click', (event) =>{
        event.preventDefault();
        const studentList = document.getElementById('studentList')
        let firstNameInput = document.getElementById("studentFirstName").value;
        let middleNameInput = document.getElementById('studentMiddleName').value;
        let lastNameInput = document.getElementById('studentLastName').value;
        let ageInput =  document.getElementById('studentAge').value;
        let emailInput = document.getElementById('studentEmail').value;
        let addressInput = document.getElementById('studentAddress').value;
        let phoneNumberInput = document.getElementById('studentPhoneNumber').value;
        let dateInput = document.getElementById('studentDate').value;
        let courseInput = document.getElementById('studentCourse').value;
        let schoolInput = document.getElementById('studentSchool').value;
        let genderInput = document.querySelector('input[name="gender"]:checked');

        let firstName = firstNameInput;
        let middleName = middleNameInput;
        let lastName = lastNameInput;
        let age = ageInput;
        let email = emailInput;
        let address = addressInput;
        let phoneNumber = phoneNumberInput;
        let dateGraduated = dateInput;
        let course = courseInput;
        let school = schoolInput;
        let gender = genderInput.value
        
        const addInfo = () => {
            return `
                <li class="studentCard">
                    <div class="name2">${firstName} ${middleName} ${lastName}</div>
                    <div class="cardContent">
                        <div class="cardHalf">
                            <div class="cardSubContent">
                                <div class="cardContentInfo">About</div>
                            </div>
                            <div class="cardSubContent">
                                <div>
                                    <div class="cardContentInfo">${age}</div>
                                    <div class="cardContentInfo">${gender}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cardHalf">
                            <div class="cardSubContent">
                                <div class="cardContentInfo">Contact</div>
                            </div>
                            <div class="cardSubContent">
                                <div>
                                    <div class="cardContentInfo">${email}</div>
                                    <div class="cardContentInfo">${phoneNumber}</div>
                                    <div class="cardContentInfo">${address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="education">
                        <div class="experience">
                            <div>
                                <div class="experience-year">${dateGraduated}</div>
                                <div class="experience-course">${course}</div>
                                <div class="">${school}</div>
                            </div>
                        </div>
                    </div>
                </li>
            `;
            }
        studentList.innerHTML += addInfo();
    })*/
    const addCard = () => {
        let id = test.length > 0? test[test.length - 1].id: 0;
        let firstName = firstNameInput;
        let middleName = middleNameInput;
        let lastName = lastNameInput;
        let age = ageInput;
        let email = emailInput;
        let address = addressInput;
        let phoneNumber = phoneNumberInput;
        let dateGraduated = dateInput;
        let course = courseInput;
        let school = schoolInput;
        let gender = genderInput.value
        
        test.push({
            id,
            firstName,
            middleName,
            lastName,
            age,
            email,
            address,
            phoneNumber,
            dateGraduated,
            course,
            school,
            gender,
        })
        localStorage.setItem("test2", JSON.stringify(test))
    }
})