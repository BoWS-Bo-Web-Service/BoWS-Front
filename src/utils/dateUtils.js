export function calculateAge(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // KST는 UTC+9
    const currentDate = new Date(now.getTime() + kstOffset);

    // 계산된 시간 차이 (밀리초 단위)
    const timeDifference = currentDate - inputDate;

    // 밀리초를 일, 시간, 분, 초로 변환
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;

    const days = Math.floor(timeDifference / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay));
    const hours = Math.floor((timeDifference % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) / (millisecondsInSecond * secondsInMinute * minutesInHour));
    const minutes = Math.floor((timeDifference % (millisecondsInSecond * secondsInMinute * minutesInHour)) / (millisecondsInSecond * secondsInMinute));
    const seconds = Math.floor((timeDifference % (millisecondsInSecond * secondsInMinute)) / millisecondsInSecond);

    let result = '';

    if (days > 0) {
        result += `${days}일 전 생성`;
    } else if (hours > 0 || minutes > 0) {
        if (hours > 0) {
            result += `${hours}시간 `;
        }
        if (minutes > 0) {
            result += `${minutes}분 `;
        }
        result += '전 생성';
    } else if (seconds > 0) {
        result += `${seconds}초 전 생성`;
    } else {
        result = '방금 전 생성';
    }

    return result;
}

