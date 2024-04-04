export const ShortenDescription=(description: string, maxLength: number): string =>{
    if (description.length <= maxLength) {
        return description;
    } else {
        return description.substring(0, maxLength) + '...';
    }
}