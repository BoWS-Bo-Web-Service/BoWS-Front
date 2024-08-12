const FormValidator = {
    validateForm: (formData, formType) => {
        const errors = {};

        switch (formType) {
            case 'login':
                if (!formData.username || formData.username.trim().length === 0) {
                    errors.username = "아이디는 필수입니다.";
                }
                if (!formData.password || formData.password.trim().length === 0) {
                    errors.password = "비밀번호는 필수입니다.";
                }
                break;

            case 'register':
                if (!formData.username || formData.username.trim().length === 0) {
                    errors.username = "아이디는 필수입니다.";
                } else if (formData.username.length < 3) {
                    errors.username = "아이디는 최소 3자 이상이어야 합니다.";
                } else if (formData.username.length > 20) {
                    errors.username = "아이디는 20자를 초과할 수 없습니다.";
                }

                if (!formData.password || formData.password.trim().length === 0) {
                    errors.password = "비밀번호는 필수입니다.";
                } else if (formData.password.length < 5) {
                    errors.password = "비밀번호는 최소 5자 이상이어야 합니다.";
                } else if (formData.password.length > 20) {
                    errors.password = "비밀번호는 20자를 초과할 수 없습니다.";
                }

                if (!formData.confirmPassword || formData.confirmPassword !== formData.password) {
                    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
                }

                if (!formData.invitationCode || formData.invitationCode.trim().length === 0) {
                    errors.invitationCode = "초대코드는 필수입니다.";
                }
                break;

            case 'project':
                if (!formData.projectName.trim()) {
                    errors.projectName = "프로젝트 이름은 필수입니다.";
                } else if (formData.projectName.length > 30) {
                    errors.projectName = "30자를 초과할 수 없습니다.";
                } else if (/^\d+$/.test(formData.projectName)) {
                    errors.projectName = "프로젝트 이름은 숫자만으로 이루어질 수 없습니다.";
                } else if (!/^[a-z0-9]+([.\-_][a-z0-9]+)*$/.test(formData.projectName)) {
                    errors.projectName = "소문자, 숫자와 점(.), 대시(-), 밑줄(_)만 사용할 수 있습니다 (특수문자는 소문자, 숫자 사이 사용)";
                }

                if (!formData.domain.trim()) {
                    errors.domain = "도메인은 필수입니다.";
                } else if (formData.domain.length > 50) {
                    errors.domain = "도메인은 50자를 초과할 수 없습니다.";
                }

                if (!formData.backendImageName.trim()) {
                    errors.backendImageName = "BE 컨테이너 이미지 이름은 필수입니다.";
                } else if (formData.backendImageName.length > 30) {
                    errors.backendImageName = "BE 컨테이너 이미지 이름은 30자를 초과할 수 없습니다.";
                }

                if (!formData.frontendImageName.trim()) {
                    errors.frontendImageName = "FE 컨테이너 이미지 이름은 필수입니다.";
                } else if (formData.frontendImageName.length > 30) {
                    errors.frontendImageName = "FE 컨테이너 이미지 이름은 30자를 초과할 수 없습니다.";
                }

                const dbEnvFields = ['dbPassword', 'dbEndpoint', 'dbUserName', 'dbUserPassword'];
                dbEnvFields.forEach(field => {
                    if (formData[field].length < 5) {
                        errors[field] = `${field}는 5자 이상이어야 합니다.`;
                    } else if (formData[field].length > 30) {
                        errors[field] = `${field}는 30자를 초과할 수 없습니다.`;
                    }
                });

                if (![1, 2, 3].includes(Number(formData.dbStorageSize))) {
                    errors.dbStorageSize = "DB 스토리지 크기는 1, 2, 3 GB 중 하나여야 합니다.";
                }
                break;

            default:
                errors.formType = "유효하지 않은 폼 타입입니다.";
        }

        return errors;
    }
};

export default FormValidator;