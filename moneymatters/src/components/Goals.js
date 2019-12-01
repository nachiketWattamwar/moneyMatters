import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image='https://www.moneycrashers.com/wp-content/uploads/2011/02/financial-goals-priorities-notebook-1068x713.jpg'
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              Financial Goal 1
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Info about financial goal one.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Share
          </Button>
          <Button size='small' color='primary'>
            Learn More
          </Button>
        </CardActions>
      </Card>

      <br />
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image='https://www.kiplinger.com/kipimages/pages/2072.jpg'
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              Financial Goal 2
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Info about financial goal two.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Share
          </Button>
          <Button size='small' color='primary'>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
