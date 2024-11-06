document.addEventListener('DOMContentLoaded', function() {
    const studentList = document.getElementById('studentList');
    const test = JSON.parse(localStorage.getItem("test2")) || [];
    const submitButton = document.getElementById('submit');
    const pageSwitch = document.getElementById('switch')

    pageSwitch.addEventListener('click', (event) => {
        event.preventDefault();
        renderInfo();
    })
    const renderInfo = (students)=> {
        const info = students.map((data) => {
            return `
                <li class="studentCard">
                    <div class="name2">${data.firstName} ${data.middleName} ${data.lastName}</div>
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
                                <div class="experience-year">${data.date}</div>
                                <div class="experience-course">${data.course}</div>
                                <div class="">${data.school}</div>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        }).join("");
        console.log(info)
        studentList.innerHTML = info;
    };
    
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Submit button clicked")
        let id = test.length > 0? test[test.length - 1].id + 1 : 1;
        let firstName = document.getElementById("studentFirstName").value;
        let middleName = document.getElementById('studentMiddleName').value;
        let lastName = document.getElementById('studentLastName').value;
        let age =  document.getElementById('studentAge').value;
        let email = document.getElementById('studentEmail').value;
        let address = document.getElementById('studentAddress').value;
        let phoneNumber = document.getElementById('studentPhoneNumber').value;
        let date = document.getElementById('studentDate').value;
        let course = document.getElementById('studentCourse').value;
        let school = document.getElementById('studentSchool').value;
        let gender = document.querySelector('input[name="gender"]:checked').value;

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
        })
        localStorage.setItem("test2", JSON.stringify(test))
        renderInfo(test)

        document.getElementById("studentFirstName").value = '';
        document.getElementById("studentMiddleName").value = '';
        document.getElementById("studentLastName").value = '';
        document.getElementById("studentAge").value = '';
        document.getElementById("studentEmail").value = '';
        document.getElementById("studentAddress").value = '';
        document.getElementById("studentPhoneNumber").value = '';
        document.getElementById("studentDate").value = '';
        document.getElementById("studentCourse").value = '';
        document.getElementById("studentSchool").value = '';
    })
})
