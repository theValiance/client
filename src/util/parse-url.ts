

//code from https://stackoverflow.com/a/8260383

export const youtubeURLRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export function youtube_parser(url: string){
    const match = url.match(youtubeURLRegex);
    return (match && match[7].length == 11) ? match[7] : false;
}