export class Category {
    id: number;
    name: string;
    description: string;
    image: string;

    public constructor(id: number, name: string, description: string, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }
}
