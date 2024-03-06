import {
  getMemories,
  getMemoriesOfUser,
  getNewMemories,
  getNewMemoriesCount,
  getNewMemoriesCountOfUser,
  getNewMemoriesOfUser,
  getOldMemories,
  getOldMemoriesOfUser,
} from "@/pages/Home/api";
import React, { useEffect, useState } from "react";
import { Alert } from "./Alert";
import MemoryView from "./MemoryView";
import { Button } from "./Button";

export default function MemoryFeed({ userId }) {
  const [memoryPage, setMemoryPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const [apiProgress, setApiProgress] = useState(false);
  const [newMemoryCount, setNewMemoryCount] = useState(0);

  let firstMemoryId = 0;
  let lastMemoryId = 0;

  if (memoryPage.content.length > 0) {
    firstMemoryId = memoryPage.content[0].id;

    const lastMemoryIndex = memoryPage.content.length - 1;
    lastMemoryId = memoryPage.content[lastMemoryIndex].id;
  }

  useEffect(() => {
    const getCount = async () => {
      let response;
      userId
        ? (response = await getNewMemoriesCountOfUser(userId, firstMemoryId))
        : (response = await getNewMemoriesCount(firstMemoryId));
      setNewMemoryCount(response.data.count);
    };

    let looper = setInterval(getCount, 1000);

    return function cleanUp() {
      clearInterval(looper);
    };
  }, [firstMemoryId, userId]);

  useEffect(() => {
    loadMemories();
  }, [userId]);

  const loadMemories = async () => {
    setApiProgress(true);
    try {
      let response;

      userId
        ? (response = await getMemoriesOfUser(userId))
        : (response = await getMemories());

      setMemoryPage(() => ({
        ...response.data,
        content: [...response.data.content],
      }));
    } catch (error) {
    } finally {
      setApiProgress(false);
    }
  };

  const loadOldMemories = async () => {
    setApiProgress(true);
    try {
      let response;

      userId
        ? (response = await getOldMemoriesOfUser(userId, lastMemoryId))
        : (response = await getOldMemories(lastMemoryId));

      setMemoryPage(() => ({
        ...response.data,
        content: [...content, ...response.data.content],
      }));
    } catch (error) {
    } finally {
      setApiProgress(false);
    }
  };

  const loadNewMemories = async () => {
    setApiProgress(true);
    try {
      let response;

      userId
        ? (response = await getNewMemoriesOfUser(userId, lastMemoryId))
        : (response = await getNewMemories(firstMemoryId));

      setMemoryPage(() => ({
        ...response.data,
        content: [...response.data, ...content],
      }));
    } catch (error) {
    } finally {
      setNewMemoryCount(0);
      setApiProgress(false);
    }
  };

  const onDeleteSuccess = (id) => {
    setMemoryPage(() => ({
      content: content.filter((memory) => (memory.id === id ? false : true)),
    }));
  };

  const { content, last } = memoryPage;
  if (content.length === 0) {
    return (
      <Alert styleType="secondary p-3 m-2 col-8">
        {" "}
        {apiProgress ? (
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
        ) : (
          <>There are no memory.</>
        )}
      </Alert>
    );
  }

  return (
    <div className="p-1 col-8">
      {newMemoryCount > 0 && (
        <div className="text-center">
          <Button
            styleType="outline-primary p-2 m-1 col-8"
            onClick={() => loadNewMemories()}
            disabled={apiProgress}
          >
            {apiProgress ? (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            ) : (
              <>Load {newMemoryCount} new memories</>
            )}
          </Button>
        </div>
      )}

      {content.map((memory, idx) => {
        return (
          <MemoryView
            key={memory.id}
            memory={memory}
            onDeleteSuccess={onDeleteSuccess}
          />
        );
      })}
      {!last && (
        <div className="text-center">
          <Button
            styleType="outline-secondary p-2 m-1 col-8"
            onClick={() => loadOldMemories()}
            disabled={apiProgress}
          >
            {apiProgress ? (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            ) : (
              <>Load old memories</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
