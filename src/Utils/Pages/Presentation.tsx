import * as React from 'react';
import { IHappyTechStore } from '../../Tables/Store';
import { Paper, Typography } from '@material-ui/core';
import './base.css';
interface IProps {
    store: IHappyTechStore
}

export class Text extends React.Component<{}, {}> {
    public render() {
        return <Typography style={{ margin: 16 }}>{this.props.children}</Typography >
    }
}
export class Presentation extends React.Component<IProps, {}> {
    public render() {
        // const presentationUrl = 'https://drive.google.com/file/d/163bsd9JvadDh3YlxbeW2GUr5Wu0kiPUs/view';
        // return <div><iframe src={presentationUrl} /></div>
        return <Paper style={{ margin: 16, padding: 16, textAlign: 'left' }}>
            <Typography className="h1" variant="headline">Qu’est-ce que la Happytech ?</Typography>
            <Text>La HappyTech est un mouvement qui a pour but de fédérer les acteurs qui mettent la technologie au service du bien-être et de labelliser les startups et les entreprises qui apportent une valeur ajoutée dans ce domaine.</Text>
            <Text>L’association française agit comme un véritable catalyseur des projets du bien-être et accompagne ainsi les entreprises vers la “happy responsabilité” pour faire de la France le leader mondial du bien-être.</Text>
            <Typography variant="headline">Comment est née la HappyTech ?</Typography>
            <Typography variant="title">D’où vient le nom ?</Typography>
            <Text>En avril 2017, l’idée d’un mouvement French Tech autour du bien-être au travail sur le modèle des FinTech ou des FoodTech émerge chez les fondateurs de Comeet.</Text>
            <Text>Pouya Mohtacham va avoir l’idée de nommer ce mouvement HappyTech pour marquer l’apport de la technologie dans la dimension sociétale du mouvement.</Text>
            <Text>La premier petit-déjeuner HappyTech a lieu en juin 2017 à l’initiative des startups Comeet et Coach for Eyes deux jours avant le salon VivaTech.</Text>
            <Typography variant="title">Un mouvement fédérateur et international</Typography>
            <Text>Plus fort ensemble. Les solutions HappyTech se fédèrent pour mieux évangéliser le marché et changer le monde du travail.</Text>
            <Text>Un leader mondial. La HappyTech suscite l’intérêt des pays où le marché du bien-être est développé : amérique du nord, europe, japon et océanie. Son modèle s’exporte actuellement.</Text>
            <Typography variant="title">Une association à but non lucratif en france</Typography>
        </Paper>
    }
}
