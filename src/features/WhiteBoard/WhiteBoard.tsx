import { FC, useState, useRef, MutableRefObject } from 'react';
import { io } from 'socket.io-client';
import styles from 'features/WhiteBoard/WhiteBoard.module.scss';
import H1, { H2, P1, P2 } from 'components/Typography/Typography';
import {
  IUserRequestResponse,
  IOnlineClientPayload,
  INoteItemPayload,
  URL,
} from 'types';
import InputForm from 'components/InputForm/InputForm';
import { PrimaryButton, SecondaryBtn } from 'components/Button/Button';
import useMountEffect from 'hooks/useMountEffect';
import { getCurrentTime } from 'utils';

const socket = (userId: string) =>
  io('http://localhost:3001', {
    extraHeaders: {
      userId,
    },
  });

const WhiteBoard: FC<IUserRequestResponse> = ({ id: userId, username }) => {
  const socketClient = socket(userId);
  const dragItem = useRef<number>();
  const dragOverItem = useRef<number>();
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [choosenNote, setChoosenNote] = useState<INoteItemPayload | null>(null);
  const [appNotes, setAppNotes] = useState<Array<INoteItemPayload>>([]);
  const [onlineUsers, setOnlineUsers] = useState<Array<IOnlineClientPayload>>(
    []
  );

  useMountEffect(() => {
    if (!userId) return;
    socketClient.emit(
      'findAllNotes',
      {},
      (response: Array<INoteItemPayload>) => {
        setAppNotes(response);
      }
    );

    socketClient.emit('joinBoard', { name: username });

    socketClient.on('boardUsers', (users) => {
      setOnlineUsers(users);
    });

    socketClient.on('note', (message) => {
      setAppNotes((prevNotes: Array<INoteItemPayload>) => {
        if (message.isMutated || message.isUpdated) {
          inputRef.current.value = '';
          setChoosenNote(null);
          return message.notesPayload;
        }
        return [...prevNotes, message.notesPayload];
      });
    });

    socketClient.on('connect_error', (err) => {
      alert(err.message);
    });
  });

  const onAddNewNote = () => {
    socketClient.emit('createNote', {
      username,
      text: inputRef.current.value,
    });
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const onRemoveNote = (id: string) => () => {
    socketClient.emit('removeNote', id);
  };

  const onSelectNoteToEdit = (id: string) => () => {
    const noteItem = appNotes.find((note) => note.id === id);
    setChoosenNote(noteItem || null);
    inputRef.current.value = noteItem?.text as string;
    inputRef.current.focus();
  };

  const onEditAction = () => {
    socketClient.emit('updateNote', {
      ...choosenNote,
      text: inputRef.current.value,
    });
  };

  const onNoteDragStart = (position: number) => () => {
    dragItem.current = position;
  };

  const onNoteDragEnter = (position: number) => () => {
    dragOverItem.current = position;
  };

  const reorderNoteItem = () => {
    if (
      typeof dragItem.current !== 'undefined' &&
      typeof dragOverItem.current !== 'undefined'
    ) {
      const appNotesList = [...appNotes];
      const dragItemContent = appNotesList[dragItem.current];

      const reorderRequestNotes = appNotes.filter(
        (_el, idx) => idx === dragItem.current || idx === dragOverItem.current
      );
      const doesBelongToCurrentUser = reorderRequestNotes.every(
        (note) => note.userId === userId
      );
      if (doesBelongToCurrentUser) {
        appNotesList.splice(dragItem.current, 1);
        appNotesList.splice(dragOverItem.current, 0, dragItemContent);
        setAppNotes(appNotesList);
        socketClient.emit('reorderNotes', {
          startIndex: dragItem.current,
          endIndex: dragOverItem.current,
        });
      }
      dragItem.current = undefined;
      dragOverItem.current = undefined;
    }
  };

  return (
    <>
      <div className={styles.whiteboardAppSection}>
        <section className={styles.whiteboard}>
          <div className={styles.whiteboard__header}>
            <H1>WhiteBoard</H1>
            <div className={styles.whiteboard__headerlist}>
              {appNotes.length >= 1 ? (
                <P2>
                  Only the owner of the note can edit, delete & drag and drop
                  their item
                </P2>
              ) : (
                <H2>Add a note item</H2>
              )}
            </div>
            <div className={styles.whiteboard__notes}>
              {appNotes.map((note, i) => {
                const isNoteOwnerCurrentUser = userId === note?.userId;
                return (
                  <div
                    className={[
                      styles.noteItemWrapper,
                      !!isNoteOwnerCurrentUser && styles.draggableNote,
                    ].join(' ')}
                    draggable={!!isNoteOwnerCurrentUser}
                    onDragStart={onNoteDragStart(i)}
                    onDragEnter={onNoteDragEnter(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnd={reorderNoteItem}
                    data-id={note.userId}
                    key={note.id}
                  >
                    {isNoteOwnerCurrentUser && (
                      <SecondaryBtn
                        className={[
                          styles.actionNoteBtn,
                          styles.deleteNote,
                        ].join(' ')}
                        onClick={onRemoveNote(note.id)}
                      >
                        x
                      </SecondaryBtn>
                    )}

                    {isNoteOwnerCurrentUser && (
                      <SecondaryBtn
                        className={[styles.actionNoteBtn, styles.editNote].join(
                          ' '
                        )}
                        onClick={onSelectNoteToEdit(note.id)}
                      >
                        <img
                          src={URL.editIcon}
                          width={12}
                          height={12}
                          alt='Edit'
                        />
                      </SecondaryBtn>
                    )}

                    <div className={styles.noteItem}>
                      <div>
                        <P1>{note.text}</P1>
                        <H2>By: {note.username}</H2>
                      </div>
                      <P2>
                        {getCurrentTime(new Date(note.timestamp).toISOString())}
                      </P2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className={styles.usersList}>
          <H2>Online Users</H2>
          {onlineUsers.map((user) => {
            return (
              <div key={user.id} className={styles.usersList__item}>
                <div className={styles.onlineStatus} />
                <P1>{user.clientName}</P1>
              </div>
            );
          })}
        </section>
      </div>
      <div className={styles.whiteboard__input}>
        <div className={styles.whiteboard__message}>
          <InputForm
            ref={inputRef}
            type='text'
            placeholder='Enter a note'
            className={styles.messageInput}
          />
          {!!choosenNote ? (
            <PrimaryButton
              onClick={onEditAction}
              className={styles.rectangleBtn}
            >
              Update
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={onAddNewNote}
              className={styles.rectangleBtn}
            >
              Submit
            </PrimaryButton>
          )}
        </div>
      </div>
    </>
  );
};

export default WhiteBoard;
