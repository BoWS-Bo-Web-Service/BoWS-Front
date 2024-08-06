const FormValidator = {
    validateForm: (formData, fieldLabels) => {
        const errors = {};

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
                errors[field] = `${fieldLabels[field]}는 5자 이상이어야 합니다.`;
            } else if (formData[field].length > 30) {
                errors[field] = `${fieldLabels[field]}는 30자를 초과할 수 없습니다.`;
            }
        });

        return errors;
    }
};

export default FormValidator;