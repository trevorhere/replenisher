import gql from 'graphql-tag';

export default gql`
 mutation CreateTask(
  $content:String,
  $listID:ID,
  $status: String,
  $creatorID: ID,
  $rank: String,
  $priority:Int,
  $dueDate:String,
  $timeDue:String,
  $started:String,
  $finished:String,
  $durationHours:Int,
  $durationMinutes:Int,
  $notes:String

	){
  createTask(
    content:$content,
    listID:$listID,
    status: $status,
    creatorID: $creatorID,
  	rank: $rank,
  	priority:$priority,
    dueDate: $dueDate,
    timeDue: $timeDue,
  	started:$started,
  	finished:$finished,
  	durationHours:$durationHours,
  	durationMinutes:$durationMinutes,
  	notes:$notes
  	){
  	id
    name
    tasks{
      id
      content
      status
      notes

    }
  }
}
`;