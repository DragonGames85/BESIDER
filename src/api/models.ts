export interface NYTArticle {
    _id: string;
    abstract: string;
    web_url: string;
    source: string;
    pub_date: string;
    multimedia: NYTMultimedia[];
}

interface NYTMultimedia {
    rank: number;
    subtype: string;
    caption?: string;
    credit?: string;
    type: string;
    url: string;
    height: number;
    width: number;
    legacy: {
        xlarge?: string;
        xlargewidth?: number;
        xlargeheight?: number;
        thumbnail?: string;
        thumbnailwidth?: number;
        thumbnailheight?: number;
        widewidth?: number;
        wideheight?: number;
        wide?: string;
    };
    subType: string;
    crop_name: string;
}
